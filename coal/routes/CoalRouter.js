const express = require('express');
const router = express.Router();
const coalController = require('../controller/CoalController');
const auth = require('../../auth/middlewares/authMwr');

router.post('/exercise', coalController.createExercise);
router.post('/template', coalController.createTemplate);
router.post('/session', coalController.createSession);

module.exports = router;