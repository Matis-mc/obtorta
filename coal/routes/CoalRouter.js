const express = require('express');
const router = express.Router();
const coalController = require('../controller/CoalController');
const auth = require('../../auth/middlewares/authMwr');

router.post('/exercise', coalController.createExercise);
router.post('/template', coalController.createTemplate);
router.post('/session', coalController.createSession);
router.get('/session', coalController.getSessions);
router.get('/template', coalController.getTemplates);
router.get('/exercise', coalController.getAllExercise);
router.get('/exercise/:id', coalController.getExerciseById);
router.get('/exercise/stat/:idExercise', coalController.getExerciseStat);
router.get('/exercise/stat/template/:idTemplate', coalController.getExerciseStatsFromTemplate);


module.exports = router;