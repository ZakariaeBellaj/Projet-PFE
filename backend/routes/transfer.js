const express = require('express');
const router = express.Router();
const transferController = require('../controllers/transferController');


router.get('/', transferController.transfererDonnees);

module.exports = router;
