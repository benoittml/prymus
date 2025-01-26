const Discord = require("discord.js")
const ms  = require("ms")

module.exports = {

    name: "unmute",
    description: "unmute un utilisateur",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    dm: false,
    category: "Modération",
    options: [{
        type: "user",
        name: "membre",
        description: "Membre à unmute",
        required: true,
        autocomplete: false,
    }, {
        type: "string",
        name: "raison",
        description: "Raison du unmute",
        required: false,
        autocomplete: false,
    },  
],

    async run (bot, message, args) {

        let user = args.getUser("membre")
        if(!user) return message.channel.send("🔊 | Pas de membre à unmute")
        let member = message.guild.members.cache.get(user.id)
        if(!member) return message.reply("🔊 | Membre introuvable")

        let reason = args.getString("raison")
        if(!reason) reason = "🔊 | Aucune raison fournie"

        if(!member.moderatable) return message.reply("🔊 | Je ne peux pas unmute ce membre")
        if(message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("🔊 | Vous n'êtes pas autorisé à unmute ce membre")
        if(!member.isCommunicationDisabled()) return message.reply("🔊 | Ce membre n'est pas mute")

        try {await user.send(`🔊 | Vous avez été unmute par ${message.user.tag} pour la raison : \`${reason}\``)} catch (err) {}

        await message.reply(`${message.user} à unmute ${user} pour la raison : \`${reason}\``)

        await member.timeout(null, reason)

    }

}
