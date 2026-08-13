const Execution = require("../model/Execution");
const Exercise = require("../model/Exercise");
const ExerciseStat = require("../model/ExerciseStat");
const Serie = require("../model/Serie");
const Template = require("../model/Template");
const Session = require("../model/Session");

exports.createExercise = async (name, categories) => {

    let exercise = await new Exercise({
        name: name,
        categories: categories
    }).save();

    await new ExerciseStat({
        idExercise: exercise._id
    }).save();
    return exercise;
}

exports.createTemplate = async (templateDto) => {

    return await new Template({
        name: templateDto.name,
        date: templateDto.date,
        exercises: templateDto.exercises,
        categories: templateDto.categories,
        description: templateDto.description,
    }).save();
}

exports.createSession = async (sessionDto) => {

    let idExecutions = [];

    for (let exercise of sessionDto.exercises) {

        let stat = await ExerciseStat.findOne({ idExercise: exercise._id });
        if (!stat) {
            stat = await initStat(exercise._id);
        }
        let idSeries = [];

        for (let serieDto of exercise.series) {
            let serie = await new Serie({
                reps: serieDto.reps,
                weight: serieDto.weight,
                warmup: serieDto.warmup | false,
                restTime: serieDto.restTime
            }).save();
            console.log("Serie enregistrée : " + JSON.stringify(serie));
            idSeries.push(serie._id);
            console.log("Stat : " + JSON.stringify(stat));
            await updateStat(serie, stat);

        }

        let execution = await new Execution({
            idInstance: exercise._id,
            idOccurences: idSeries
        }).save();

        idExecutions.push(execution._id);
    }

    return await new Session({
        name: sessionDto.name,
        date: sessionDto.date,
        idExecutions: idExecutions,
        categories: sessionDto.categories,
        description: sessionDto.description,
        duration: sessionDto.duration
    }).save();
}

exports.setExerciseStat = async (exerciseStatDto) => {

    let stat = await ExerciseStat.findOne({ idExercise: exerciseStatDto.exerciseId });
    if (!stat) {
        stat = await initStat(exerciseStatDto.exerciseId);
    }
    stat.record.set(String(exerciseStatDto.record.reps), exerciseStatDto.record.weight);
    stat.workload.set(String(exerciseStatDto.travail.reps), exerciseStatDto.travail.weight);
    return await stat.save();
}


exports.getAllExercise = async () => {

    return await Exercise.find();

}

exports.getExerciseByCategory = async (category) => {

    return await Exercise.find({ categories: category });

}



exports.getSession = async (category) => {

    let sessions = await Session.find({ categories: category }).sort('-date');
    sessions = await Promise.all(sessions.map(s => s.executions = getExercisesForSession(s)));
    return sessions;
}

exports.getSessions = async () => {
    let sessions = await Session.find().sort('-date').lean();
    sessions = await Promise.all(sessions.map(async s => {
        s.executions = await getExercisesForSession(s);
        return s;
    }));
    console.log(sessions);
    return sessions;

}

exports.getTemplates = async () => {

    return await Template.find().sort('-date');

}

exports.getTemplateByCategory = async (category) => {

    return await Template.find({ categories: category }).sort('-date');

}

exports.getExerciseByName = async (exerciceName) => {
    return await Exercise.find({ name: exerciceName }).sort('-date');
}

exports.getExerciseById = async (idExercise) => {
    return await Exercise.findById(idExercise);
}

exports.getExerciseStatById = async (exerciseId) => {
    return await ExerciseStat.find({ idExercise: exerciseId });
}

exports.getSeriesFromExecutionIds = async (executionIds) => {
    return await Serie.find({ _id: { $in: executionIds } });
}

exports.getExerciseStatFromTemplateId = async (templateId) => {
    template = await Template.findById(templateId);
    let stats = [];
    for (let exercise of template.exercises) {
        let stat = await ExerciseStat.findOne({ idExercise: exercise._id });
        if (!stat) {
            stat = await initStat(exercise._id);
        }
        stats.push(stat);
    }
    return stats;

}

getExercisesForSession = async (session) => {
    let executions = [];
    for (let idExecution of session.idExecutions) {
        let e = {};
        let execution = await Execution.findOne({ _id: idExecution }).lean();
        e.exercise = await this.getExerciseById(execution.idInstance);
        e.series = await this.getSeriesFromExecutionIds(execution.idOccurences);
        executions.push(e);
    }
    return executions;
}

updateStat = async (serie, stat) => {

    console.log(stat);
    let rp = stat.record.get(serie.reps);
    if (rp == undefined || rp < serie.weight) {
        stat.record.set(serie.reps.toString(), Number(serie.weight));
        console.log("Nouveau record ! " + serie.reps + "x" + serie.weight + "kg");
    };

    let wkl = stat.workload.get(serie.reps);
    if (wkl == undefined || wkl != serie.weight) {
        stat.workload.set(serie.reps.toString(), Number(serie.weight));
    }

    stat.nbSession = stat.nbSession + 1;

    await stat.save();

}

initStat = async (exerciseId) => {
    return await new ExerciseStat({
        idExercise: exerciseId,
        record: new Map(),
        workload: new Map(),
        nbSession: 0
    }).save();
}

