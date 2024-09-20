const express = require('express');
const router = express.Router();
const couturiereController = require('../controllers/couturiereController');


router.get('/', couturiereController.createCouturiere);

module.exports = router;