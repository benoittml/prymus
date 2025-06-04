const Discord = require('discord.js')

module.exports = {

    name: "clear",
    description: "Effacer les messages d'un salon",
    permission: Discord.PermissionFlagsBits.ManageMessages,
    dm: false,
    category: "Modération",
    options: [
        {
            type: "number",
            name: "nombre",
            description: "Le nombre de messages à effacer",
            required: true,
            autocomplete: false,
        }, {
            type: "channel",
            name: "salon",
            description: "Le salon où effacer les messages",
            required: false,
            autocomplete: false,
        }
    ],

    async run(bot, message, args) {

        let channel = args.getChannel("salon")
        if(!channel) channel = message.channel;
        if(channel.id !== message.channel.id && !message.guild.channels.cache.get(channel.id)) return message.reply("🚫 | Réessayez avec un salon valide !")

        let number = args.getNumber("nombre")
        if(parseInt(number) <= 0 || parseInt(number) > 100) return message.reply("il nous faut un nombre entre `1` et `100` inclus !")

        try {

            let messages = await channel.bulkDelete(parseInt(number))

            await message.reply({content: `🚫 | J'ai bien supprimé \`${messages.size}\` message(s) !`, ephemeral: true})

        } catch (err) {

            let messages = (await channel.messages.fetch()).filter(m => Date.now() - m.createdTimestamp <= 1209600000)
            if(messages.size <= 0) return message.reply("🚫 | Aucun messages à supprimer car ils datent tous de 14 jours ou plus !")
            await channel.bulkDelete(messages)

            await message.reply({content: `🚫 | J'ai pu supprimé seulement \`${messages.size}\` message(s) car les autres dataient de plus de 14 jours !`, ephemeral: true})
        }
    }
}