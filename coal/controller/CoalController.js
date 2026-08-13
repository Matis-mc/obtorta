const coalService = require('../service/CoalService');


exports.createExercise = (req, res, next) => {
    console.log(JSON.stringify(req.body));
    let exercise = coalService.createExercise(req.body.name, req.body.categories);
    res.status(201).send(exercise);
}

exports.createTemplate = async (req, res, next) => {
    try {
        console.log(JSON.stringify(req.body));
        let template = await coalService.createTemplate(req.body);
        res.status(201).send(template);
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}

exports.createSession = async (req, res, next) => {
    try {
        let session = await coalService.createSession(req.body);
        res.status(201).send(session);
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}

exports.setExerciseStat = async (req, res, next) => {
    try {
        let exerciseStat = await coalService.setExerciseStat(req.body);
        res.status(201).send(exerciseStat);
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}

exports.getTemplates = async (req, res, next) => {
    try {
        let template = await coalService.getTemplates();
        res.status(200).send(template);
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}

exports.getAllExercise = async (req, res, next) => {
    try {
        let exercises = await coalService.getAllExercise();
        res.status(200).send(exercises);
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}

exports.getExerciseById = async (req, res, next) => {
    try {
        const exercise = await coalService.getExerciseById(req.params.id);
        if (!exercise) {
            return res.status(404).send({ message: "Exercise not found" });
        }
        res.status(200).send(exercise);
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
};

exports.getSessions = async (req, res, next) => {
    try {
        let sessions = await coalService.getSessions();
        res.status(200).send(sessions);
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}

exports.getExerciseStat = async (req, res, next) => {

    try {
        let exerciseStat = await coalService.getExerciseStatById(req.params.idExercise);
        res.status(200).send(exerciseStat);
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }

}

exports.getExerciseStatsFromTemplate = async (req, res, next) => {
    try {
        let exerciseStats = await coalService.getExerciseStatFromTemplateId(req.params.idTemplate);
        res.status(200).send(exerciseStats);
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}