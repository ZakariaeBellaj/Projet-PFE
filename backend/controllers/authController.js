const bcrypt = require('bcryptjs');
const fs = require('fs');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

let users = [];

// Charger les utilisateurs depuis le fichier CSV
const loadUsers = () => {
    fs.stat('users.csv', (err) => {
        if (err) {
            // Si le fichier n'existe pas, on le crée avec les en-têtes
            fs.writeFile('users.csv', 'username,password\n', (writeErr) => {
                if (writeErr) {
                    console.error('Erreur lors de la création de users.csv', writeErr);
                }
            });
        }

        // Charger les utilisateurs du fichier CSV
        fs.createReadStream('users.csv')
            .pipe(csv())
            .on('data', (data) => {
                users.push(data);
            })
            .on('end', () => {
                console.log('Utilisateurs chargés depuis le CSV');
            });
    });
};

// Appeler la fonction pour charger les utilisateurs au démarrage du serveur
loadUsers();

// Inscription d'un nouvel utilisateur
exports.register = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Le nom d\'utilisateur et le mot de passe sont requis' });
    }

    // Vérifier si l'utilisateur existe déjà
    const userExists = users.find(u => u.username === username);
    if (userExists) {
        return res.status(400).json({ message: 'Utilisateur déjà existant' });
    }

    // Hashage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Ajouter le nouvel utilisateur
    const newUser = { username, password: hashedPassword };
    users.push(newUser);

    // Écrire dans le fichier CSV
    const csvWriter = createCsvWriter({
        path: 'users.csv',
        header: [
            { id: 'username', title: 'username' },
            { id: 'password', title: 'password' }
        ],
        append: true,
    });

    await csvWriter.writeRecords([newUser]);
    res.status(201).json({ message: 'Utilisateur créé avec succès' });
};

// Connexion d'un utilisateur
exports.login = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Le nom d\'utilisateur et le mot de passe sont requis' });
    }

    // Trouver l'utilisateur dans la liste
    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(401).json({ message: 'Identifiants incorrects' });
    }

    // Comparer les mots de passe
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Mot de passe incorrect' });
    }

    res.status(200).json({ message: 'Connexion réussie' });
};
