const Discord = require('discord.js');

module.exports = {

    name: "help",
    description: "Donne les commandes du bot",
    permission: "Aucune",
    dm: true,
    category: "Information",
    options: [
        {
            type: "string",
            name: "commande",
            description: "La commande à afficher",
            required: false,
            autocomplete: true,
            
        }
    ],

    async run(bot, message, args) {
        
        let command;
        if(args.getString("commande")) {
            command = bot.commands.get(args.getString("commande"));
            if(!command) return message.reply("⛔ | Pas de commande trouvée !")
        }

        if(!command) {

            let categories = [];
            bot.commands.forEach(command => {
                if(!categories.includes(command.category)) categories.push(command.category)
            })

            let Embed = new Discord.EmbedBuilder()
            .setColor(bot.color)
            .setTitle(`Commandes du bot`)
            .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`Commandes disponibles : \`${bot.commands.size}\`\nCatégories disponibles : \`${categories.length}\``)
            .setTimestamp()
            .setFooter({text: "Commandes du bot"})

            await categories.sort().forEach(async cat => {

                let commands = bot.commands.filter(cmd => cmd.category === cat)
                Embed.addFields({name: `${cat}`, value: `${commands.map(cmd =>`\`${cmd.name}\` : ${cmd.description}`).join("\n")}`})
            })

            await message.reply({embeds: [Embed]})

        }else {

            let Embed = new Discord.EmbedBuilder()
            .setColor(bot.color)
            .setTitle(`Commandes ${command.name}`)
            .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`Nom : \`${command.name}\`\nDescription : \`${command.description}\`\nPermission requise : \`${typeof command.permission !== "bigint" ? command.permission : new Discord.PermissionsBitField(command.permission).toArray(false)}\`\nCommande en DM : \`${command.dm ? "Oui" : "Non"}\`\nCatégorie : \`${command.category}\``)
            .setTimestamp()
            .setFooter({text: "Commandes du bot"})

            await message.reply({embeds: [Embed]})
        }
    }
}