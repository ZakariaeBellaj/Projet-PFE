const express = require('express');
const router = express.Router();
const suiviController = require('../controllers/suiviController');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });



router.post('/', upload.single('file'), suiviController.enregistrerTache);

module.exports = router;