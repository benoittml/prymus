# Prymus Discord Bot

Prymus est un bot Discord créé avec Discord.js pour ajouter des fonctionnalités à votre serveur Discord. Ce projet suit les tutoriels du youtubeur [Mad Rage](https://www.youtube.com/@Mad_Rage).

## Fonctionnalités

- Gestion de commandes simples et avancées.
- Interaction avec les membres du serveur.
- Personnalisation facile via les fichiers de configuration.

## Installation

1. **Cloner le dépôt** :

   ```bash
   git clone https://github.com/benoittml/prymus.git
   cd prymus-discord-bot
   ```

2. **Installer les dépendances** :
   Assurez-vous d'avoir Node.js installé (version 16 ou supérieure).

   ```bash
   npm install discord.js
   ```

3. **Configurer le bot** : Rendez vous dans le fichier `config.js`  et remplissez les informations requises :

   ```env
   module.exports = {

       token: "votre token ici",
   }

   ```

3-1. **Configurer la base de donnée**, il faut se rendre dans `./Loaders/loadDatabase.js` et modifier les informations :

      ```env
        host: "localhost",
        user: "root",
        password: "",
        database: "nomdeladatabase"
   ```

5. **Lancer le bot** :

   ```bash
   node main
   ```

##

## Ressources

- [Documentation Discord.js](https://discord.js.org/#/docs)
- Tutoriels de [Mad Rage](https://youtube.com/Mad_Rage)

## Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus d'informations.

---

Appréciez utiliser Prymus ! Si vous avez des questions ou des suggestions, n'hésitez pas à ouvrir une issue.

