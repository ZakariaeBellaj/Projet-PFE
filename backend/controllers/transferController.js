const fs = require('fs');
const csvParser = require('csv-parser');
const sql = require('msnodesqlv8');

const connectionString = 'Driver={Microsoft Access Driver (*.mdb, *.accdb)};DBQ=./path/to/database.accdb;';

// Fonction pour le transfert manuel (via l'API)
exports.transfererDonnees = (req, res) => {
    transfererDonneesVersAccess((err) => {
        if (err) {
            res.status(500).send('Erreur lors du transfert des données');
        } else {
            res.send('Données transférées avec succès vers MS Access');
        }
    });
};

// Fonction pour le transfert automatique (via node-cron)
exports.transfererDonneesAuto = () => {
    transfererDonneesVersAccess((err) => {
        if (err) {
            console.error('Erreur lors du transfert automatique des données :', err);
        } else {
            console.log('Transfert automatique des données vers MS Access réussi');
        }
    });
};

// Fonction partagée qui effectue le transfert des données vers MS Access
function transfererDonneesVersAccess(callback) {
    fs.createReadStream('tasks.csv')
        .pipe(csvParser())
        .on('data', (row) => {
            const query = `INSERT INTO Tasks (Ligne, Matricule, Tache, Status, Commentaire, VideoPath) 
                           VALUES ('${row.ligne}', '${row.matricule}', '${row.tache}', '${row.status}', '${row.commentaire}', '${row.videoPath}')`;

            sql.query(connectionString, query, (err) => {
                if (err) {
                    return callback(err);
                }
            });
        })
        .on('end', () => {
            callback(null);
        });
}
