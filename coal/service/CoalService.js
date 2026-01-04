const Execution = require("../model/Execution");
const Exercise = require("../model/Exercise");
const ExerciseStat = require("../model/ExerciseStat");
const Serie = require("../model/Serie");
const Template = require("../model/Template");
const Session = require("../model/Session");

exports.createExercise = async (name, categories) => {

        let exercise =  await new Exercise({
            name: name,
            categories: categories
        }).save();

        await new ExerciseStat({
            idExercise: exercise._id
        }).save();
        return exercise;
}

exports.createTemplate = async (templateDto) => {

    let idExecutions = [];stat

    for(let exercise of templateDto.exercises){
        console.log("ExerciseDto : " + JSON.stringify(exercise));

        let idSeries = [];

        for(let serieDto of exercise.series){
            console.log("SerieDto : " + JSON.stringify(serieDto));
            let serie = await new Serie({
                reps: serieDto.reps,
                weight: serieDto.weight,
                warmup: serieDto.warmup | false,
                restTime: serieDto.restTime
            }).save();
            console.log("Serie enregistrée : " + JSON.stringify(serie));
            idSeries.push(serie._id);
        }

        let execution = await new Execution({
            idInstance: exercise._id,
            idOccurences: idSeries
        }).save();

        idExecutions.push(execution._id);
    }

    return await new Template({
        name: templateDto.name,
        date: new Date(templateDto.date),
        idExecutions: idExecutions,
        categories: templateDto.categories,
        description: templateDto.description,
    }).save();
}

exports.createSession = async (sessionDto) => {

    let idExecutions = [];

    for(let exercise of sessionDto.exercises){
        
        let stat = await ExerciseStat.findOne({idExercise: exercise._id});
        let idSeries = [];

        for(let serieDto of exercise.series){
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

exports.getAllExercise = async () => {

    return await Exercise.find();

}

exports.getExerciseByCategory = async (category) => {

    return await Exercise.find({categories: category});

}

exports.getSession = async () => {

    return await Session.find().sort('-date');

}


exports.getSession = async (category) => {

    return await Session.find({categories: category}).sort('-date');

}

exports.getTemplate = async () => {

    return await Template.find().sort('-date');

}

exports.getTemplateByCategory = async (category) => {

    return await Template.find({categories: category}).sort('-date');

}

updateStat = async (serie, stat) => {

    console.log(stat);
    let rp = stat.record.get(serie.reps);
    if(rp == undefined || rp < serie.weight){
        stat.record.set(serie.reps.toString(), Number(serie.weight));
        console.log("Nouveau record ! " + serie.reps + "x" + serie.weight + "kg");
    };

    let wkl = stat.workload.get(serie.reps);
    if(wkl == undefined || wkl != serie.weight){
        stat.workload.set(serie.reps.toString(), Number(serie.weight));
    }

    stat.nbSession = stat.nbSession + 1;

    await stat.save();

}