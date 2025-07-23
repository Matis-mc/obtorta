const express = require('express');
const router = express.Router();
const coffeeCtrl = require('../controllers/coffeeController');
const auth = require('../../auth/middlewares/authMwr');

router.post('/tasting', auth, coffeeCtrl.createTasting);
router.get('/tasting', auth, coffeeCtrl.getTastings);
router.post('/pot', auth, coffeeCtrl.createPot);
router.get('/pot', auth, coffeeCtrl.getPots);

module.exports = router;