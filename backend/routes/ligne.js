const express = require('express');
const router = express.Router();
const ligneController = require('../controllers/ligneController');

router.post('/', ligneController.createLigne);

module.exports = router;