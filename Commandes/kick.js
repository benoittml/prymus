const Discord = require('discord.js')

module.exports = {

    name: "kick",
    description: "Kick un membre",
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    category: "Modération",
    options: [{
        type: "user",
        name: "membre",
        description: "Membre à kick",
        required: true,
        autocomplete: false,
    }, {
        type: "string",
        name: "raison",
        description: "Raison du kick",
        required: false,
        autocomplete: false,
    } ],
    async run(bot, message,args) {

            
        let user = args.getUser("membre")
        if(!user) return message.reply("⛔ | Membre introuvable")
        let member = message.guild.members.cache.get(user.id)
        if(!member) return message.reply("⛔ | Membre introuvable")

        let reason = args.getString("raison")
        if(!reason) reason = "⛔ | Pas de raison fournie"

        if(message.user.id === user.id) return message.reply("⛔ | N'essaie pas de te kick")
        if((await message.guild.fetchOwner()).id === user.id) return message.reply("⛔ | Vous ne pouvez pas kick le fondateur du serveur")
        if(member && !member?.kickable) return message.reply("⛔ | Vous ne pouvez pas kick ce membre")
        if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("⛔ | Vous ne pouvez pas kick cette personne")

        try {await user.send(`Tu as été kick du serveur ${message.guil.name} par ${message.user.tag} pour la raison : \`${reason}\` `)} catch (err) {}

        await message.reply (`⛔ | ${user} a été kick du serveur par ${message.user} pour la raison : \`${reason}\``)

        await member.kick(reason)
        
    }
}
