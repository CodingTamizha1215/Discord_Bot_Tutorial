const Discord = require("discord.js");
const binfo = require('../storage/config.json')

module.exports = {
    name: "help",
    description: "To show The all command",
    permission: "Null",
    category: "bot",

    async execute(bot, message, args) {
        if (!args[0]) {
            const botcategory = bot.commands.filter(x => x.category == 'bot').map((x) => x.name).join(', ');
            const utility = bot.commands.filter(x => x.category == 'utility').map((x) => x.name).join(', ');

            const helpEmbed = new Discord.MessageEmbed()
            .setColor(binfo.color)
            .setThumbnail(bot.user.displayAvatarURL())
            .addField(`**__BOT__**`, botcategory)
            .addField(`**__UTILITY__**`, utility)
            .setFooter(`Type ${binfo.prefix}help <command> for more information`, bot.user.displayAvatarURL())
            .setTimestamp()

            return message.channel.send(helpEmbed)
        }
        else {
            const command = bot.commands.get(args.join(" ").toLowerCase()) 
            if (!command) return message.channel.send(`No command with the given name.`)
            else {
                const help_helpEmbed = new Discord.MessageEmbed()
              .setColor(binfo.color)
              .setThumbnail(bot.user.displayAvatarURL())
              .addField(`**Name**`, command.name)
              .addField(`**Description**`, command.description)
              .addField(`**Permission**`, command.permission)
              .addField(`**category**`, command.category)
              .setTimestamp()

                return message.channel.send(help_helpEmbed)
            }
        }
    }
}