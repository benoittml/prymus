const Discord = require("discord.js")

module.exports = {

    name: "ping",
    description: "Vérifier le ping du bot sur son serveur Discord.",
    permission: "Aucune",
    dm: false,
    category: "Information",

    async run(bot, message) {
        
        const pingEmbed = new Discord.EmbedBuilder()
        .setColor(0x36393E)
        .setTitle('☁️・Ping du bot')
        .setDescription(`➡️・Voici le ping du bot\nPing : \`${bot.ws.ping}\``);
        
        await message.reply({embeds: [pingEmbed]});
    }
}