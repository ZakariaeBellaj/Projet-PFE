const fs = require('fs');
const path = require('path');
const csvFilePath = path.join(__dirname, '../data/couturieres.csv');

exports.createCouturiere = (req, res) => {
    const { matricule, nom } = req.body;

    if (!matricule || !nom) {
        return res.status(400).json({ message: 'Matricule et nom sont requis' });
    }

    const ligne = `${matricule},${nom}\n`;

    fs.appendFile(csvFilePath, ligne, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur lors de l\'écriture dans le fichier', error: err });
        }
        res.status(201).json({ message: `Couturière "${nom}" créée avec succès` });
    });
};
