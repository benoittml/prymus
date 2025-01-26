const Discord = require('discord.js')
const intents = new Discord.IntentsBitField(3276799)
const bot = new Discord.Client({intents :3276799})
const loadCommands = require("./Loaders/loadCommands")
const loadEvents = require("./Loaders/loadEvents")
const config = require("./config.js")

bot.commands = new Discord.Collection();
bot.color = "#1E9AF4";


bot.login(config.token)
loadCommands(bot)
loadEvents(bot)





