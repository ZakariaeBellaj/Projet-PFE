const fs = require('fs');
const csvParser = require('csv-parser');

exports.afficherDashboard = (req, res) => {
  const couturieresTraitees = new Set();

  fs.createReadStream('tasks.csv')
    .pipe(csvParser())
    .on('data', (row) => {
      couturieresTraitees.add(row.matricule);
    })
    .on('end', () => {
      res.json({ couturieresTraitees: couturieresTraitees.size });
    });
};
