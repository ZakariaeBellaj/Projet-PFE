const express = require('express');
const authController = require('../controllers/authController');
const { body } = require('express-validator');

const router = express.Router();

// Route d'inscription
router.post('/register', [
    body('username').isString().notEmpty(),
    body('password').isLength({ min: 6 }),
], authController.register);

// Route de connexion
router.post('/login', [
    body('username').isString().notEmpty(),
    body('password').notEmpty(),
], authController.login);

module.exports = router;
