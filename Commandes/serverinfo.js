const Discord = require('discord.js');

module.exports = {

    name: "serverinfo",
    description: "Affiche les informations du serveur",
    permission: "Aucune",
    dm: false,
    category: "Information",

    async run(bot, message) {
        let guild = message.guild;

        let embed = new Discord.EmbedBuilder()
        .setColor(bot.color)
        .setTitle(`Informations sur ${guild.name}`)
        .setThumbnail(guild.iconURL({ dynamic: true }))
        .addFields(
            {name: "ID", value: `${guild.id}`, inline: true},
            {name: "Crée le", value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:F>`, inline: true},
            {name: "Membres", value: `${guild.memberCount}`, inline: true}
        )
        .setTimestamp()
        .setFooter({text: "Infos serveur"});

        await message.reply({embeds: [embed]});
    }
}
