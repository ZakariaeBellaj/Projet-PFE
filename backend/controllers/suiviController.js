const fs = require('fs');
const path = require('path');
const csvFilePath = path.join(__dirname, '../data/suivi.csv');

exports.enregistrerTache = (req, res) => {
    const { matriculeCouturiere, taches } = req.body;
    const file = req.file;

    if (!matriculeCouturiere || !taches) {
        return res.status(400).json({ message: 'Matricule de la couturière et tâches sont requis' });
    }

    // Parser taches pour vérifier si c'est un tableau
    let tachesArray;
    try {
        tachesArray = JSON.parse(taches);
    } catch (error) {
        return res.status(400).json({ message: 'Le format des tâches est invalide' });
    }

    if (!Array.isArray(tachesArray)) {
        return res.status(400).json({ message: 'Les tâches doivent être un tableau' });
    }

    // Le reste de la logique...
    tachesArray.forEach(tache => {
        const ligne = `${matriculeCouturiere},${tache.description},${tache.statut},${tache.commentaire || ''},${tache.videoUrl || ''},${file.path}\n`;
        fs.appendFile(csvFilePath, ligne, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Erreur lors de l\'écriture dans le fichier', error: err });
            }
        });
    });

    res.status(201).json({ message: 'Tâches enregistrées avec succès' });
};
