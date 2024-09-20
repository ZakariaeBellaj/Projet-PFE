const express = require('express');
const cron = require('node-cron');
const transferController = require('./controllers/transferController');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importer les routes
const ligneRoutes = require('./routes/ligne');
const couturiereRoutes = require('./routes/couturiere');
const suiviRoutes = require('./routes/suivi');
const transferRoutes = require('./routes/transfer');
const dashboardRoutes = require('./routes/dashboard');
const authRoutes = require('./routes/auth');

// Utilisation des routes
app.use('/ligne', ligneRoutes);
app.use('/couturiere', couturiereRoutes);
app.use('/suivi', suiviRoutes);
app.use('/transfer', transferRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/auth', authRoutes);





// Planification avec node-cron pour transférer automatiquement les données CSV vers MS Access chaque jour à minuit (00:00)
cron.schedule('0 0 * * *', () => {
    console.log('Exécution du transfert automatique de CSV vers MS Access');
    transferController.transfererDonneesAuto();
}, {
    timezone: "Afrique/Maroc" // Spécifie la timezone, change-la selon ton besoin
});

app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});
