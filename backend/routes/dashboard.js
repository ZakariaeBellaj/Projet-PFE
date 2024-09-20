const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

// Route pour afficher le tableau de bord
router.get('/', dashboardController.afficherDashboard);

module.exports = router;
