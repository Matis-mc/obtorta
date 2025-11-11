const express = require('express');
const router = express.Router();
const herdCtrl = require("../controller/herdController");
const notifCtrl = require("../../commons/controllers/notificationController");
const multer  = require('multer')
const upload = multer()

router.get('/wakeup', herdCtrl.wakeUp)
router.post('/participants', herdCtrl.addParticipant);
router.get('/participants', herdCtrl.getParticipant);
router.delete('/participants', herdCtrl.deleteParticipant);
router.get('/events', herdCtrl.getEvents);
router.post('/events', upload.single("file"), herdCtrl.createEvent);
router.delete('/events', herdCtrl.deleteEvent);
router.get('/gpx', herdCtrl.downloadGPX);
router.post('/gpx', upload.single("file"), herdCtrl.uploadGPX);

router.get('/votes', herdCtrl.getAllVotes);
router.post('/votes', herdCtrl.sendVote);

router.post('/notifications/send', notifCtrl.send);
router.post('/notifications/subscribe', notifCtrl.subscribe);


module.exports = router;
