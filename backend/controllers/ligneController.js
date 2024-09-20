const fs = require('fs');
const path = require('path');
const csvFilePath = path.join(__dirname, '../data/lignes.csv');

exports.createLigne = (req, res) => {
    const { nomLigne } = req.body;

    if (!nomLigne) {
        return res.status(400).json({ message: 'Le nom de la ligne est requis' });
    }

    const ligne = `${nomLigne}\n`;

    fs.appendFile(csvFilePath, ligne, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur lors de l\'écriture dans le fichier', error: err });
        }
        res.status(201).json({ message: `Ligne de couture "${nomLigne}" créée avec succès` });
    });
};
