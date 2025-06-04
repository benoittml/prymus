const Discord = require('discord.js');

module.exports = {

    name: "userinfo",
    description: "Affiche les informations d'un utilisateur",
    permission: "Aucune",
    dm: false,
    category: "Information",
    options: [{
        type: "user",
        name: "membre",
        description: "Membre dont afficher les informations",
        required: false,
        autocomplete: false,
    }],

    async run(bot, message, args) {
        let user = args?.getUser("membre") || message.user;
        let member = message.guild.members.cache.get(user.id);

        let embed = new Discord.EmbedBuilder()
        .setColor(bot.color)
        .setTitle(`Informations sur ${user.tag}`)
        .setThumbnail(user.displayAvatarURL({ dynamic: true }))
        .addFields(
            {name: "ID", value: `${user.id}`, inline: true},
            {name: "Compte créé le", value: `<t:${Math.floor(user.createdTimestamp / 1000)}:F>`, inline: true},
            {name: "A rejoint le serveur", value: member ? `<t:${Math.floor(member.joinedTimestamp / 1000)}:F>` : "Non disponible", inline: true},
            {name: "Rôles", value: member ? member.roles.cache.map(r => r).join(', ') : "Aucun", inline: false},
        )
        .setTimestamp()
        .setFooter({text: "Infos utilisateur"});

        await message.reply({embeds: [embed]});
    }
}
