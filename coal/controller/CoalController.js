const coalService = require('../service/CoalService');


exports.createExercise = (req, res, next) => {
    console.log(JSON.stringify(req.body));
    let exercise = coalService.createExercise(req.body.name, req.body.categories);
    res.status(201).send(exercise);
}

exports.createTemplate = (req, res, next) => {
    try {
        console.log(JSON.stringify(req.body));
        let template = coalService.createTemplate(req.body);
        res.status(201).send(template);
    } catch(e){
        console.log(e);
        res.status(500).send(e);
    }
}

exports.createSession = (req, res, next) => {
    let session = coalService.createSession(req.body);
    res.status(201).send(session);

}