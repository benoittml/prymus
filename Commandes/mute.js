        const Discord = require("discord.js")
        const ms  = require("ms")

        module.exports = {

            name: "mute",
            description: "Mute un utilisateur",
            permission: Discord.PermissionFlagsBits.ModerateMembers,
            dm: false,
            category: "Modération",
            options: [{
                type: "user",
                name: "membre",
                description: "Membre à mute",
                required: true,
                autocomplete: false,
            }, {
                type: "string",
                name: "temps",
                description: "Temps du mute",
                required: true,
                autocomplete: false,
            }, {
                type: "string",
                name: "raison",
                description: "Raison du mute",
                required: false,
                autocomplete: false,
            },  
        ],

        async run (bot, message, args) {

            let user = args.getUser("membre")
            if(!user) return message.reply("🔇 | Pas de membre à mute")
            let member = message.guild.members.cache.get(user.id)
            if(!member) return message.reply("🔇 | Membre introuvable")

            let time = args.getString("temps")
            if(!time) return message.reply("🔇 | Pas de temps indiqué")
            if(isNaN(ms(time))) return message.reply("🔇 | Temps invalide")
            if(ms(time) > 2419200000) return message.reply("🔇 | Le mute ne peut pas durer plus de 28 jours")

            let reason = args.getString("raison")
            if(!reason) reason = "🔇 | Aucune raison fournie"

            if(message.user.id === member.id) return message.reply("🔇 | Vous ne pouvez pas vous mute vous même")
            if((await message.guild.fetchOwner()).id === user.id) return message.reply("🔇 | Vous ne pouvez pas mute le fondateur du serveur") 
            if(!member.moderatable) return message.reply("🔇 | Je ne peux pas mute ce membre")
            if(message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("🔇 | Vous ne pouvez pas mute cette personne")
            if(member.isCommunicationDisabled()) return message.reply("🔇 | Cette personne est déja mute")

            try {await user.send(`Tu as été mute du serveur ${message.guil.name} par ${message.user.tag}, pendant ${time},  pour la raison : \`${reason}\` `)} catch (err) {}

            await message.reply (`🔇 | ${user} a été mute du serveur par ${message.user}, pendant ${time} pour la raison : \`${reason}\``)*

            await member.timeout(ms(time))

        }
    }