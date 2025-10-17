const express = require('express');
const router = express.Router();
const herdCtrl = require("../controller/herdController");

router.get('/wakeup', herdCtrl.wakeUp)
router.post('/participants', herdCtrl.addParticipant);
router.get('/participants', herdCtrl.getParticipant);
router.delete('/participants', herdCtrl.deleteParticipant);
router.get('/events', herdCtrl.getEvents);
router.post('/events', herdCtrl.createEvent);

module.exports = router;
