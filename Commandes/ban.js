const Discord = require('discord.js')

module.exports = {

    name: "ban",
    description: "Ban un membre",
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    category: "Modération",
    options: [{
        type: "user",
        name: "membre",
        description: "Membre à ban",
        required: true,
        autocomplete: false,
    }, {
        type: "string",
        name: "raison",
        description: "Raison du bannissement",
        required: false,
        autocomplete: false,
    } ],
    async run(bot, message,args) {

        try {
            
            let user = await bot.users.fetch(args._hoistedOptions[0].value)
            if(!user) return message.reply("⛔ | Membre introuvable")
            let member = message.guild.members.cache.get(user.id)

            let reason = args.getString("raison")
            if(!reason) reason = "⛔ | Pas de raison fournie"

            if(message.user.id === user.id) return message.reply("⛔ | N'essaie pas de te bannir")
            if((await message.guild.fetchOwner()).id === user.id) return message.reply("⛔ | Vous ne pouvez pas bannir le fondateur du serveur")
            if(member && !member?.bannable) return message.reply("⛔ | Vous ne pouvez pas bannir ce membre")
            if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("⛔ | Vous ne pouvez pas bannir cette personne")
            if((await message.guild.bans.fetch()).get(user.id)) return message.reply ("⛔ | Ce membre est déjà banni")

            try {await user.send(`Tu as été banni du serveur ${message.guil.name} par ${message.user.tag} pour la raison : \`${reason}\` `)} catch (err) {}

            await message.reply (`⛔ | ${user} a été banni du serveur par ${message.user} pour la raison : \`${reason}\``)

            await message.guild.bans.create(user.id, {reason: reason})
        
        } catch (err)
        {
            return message.reply("⛔ | Pas de membre à bannir")
        }
        
    }
}
