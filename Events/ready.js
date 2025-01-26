const discord = require('discord.js')
const loadDatabase = require("../Loaders/loadDatabase")
const loadSlashCommands = require('../Loaders/loadSlashCommands')

module.exports = async bot => {

    bot.db = await loadDatabase()

    bot.db.connect(function () {

        console.log("💧 | Je me suis connecté à la base de données avec succès")
    })

    await loadSlashCommands(bot)

    console.log(`🦈 | Je suis connecté en tant que ${bot.user.tag} !`)
}
