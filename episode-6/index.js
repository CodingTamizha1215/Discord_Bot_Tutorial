const { Client, MessageEmbed } = require("discord.js");
const client = new Client();
const Botconfig = require('./config.json')
const moment = require(`moment`)
client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
})

client.on('guildMemberAdd', async member => {
    const welcomechannel = member.guild.channels.cache.find(ch => ch.id === '868888309596827750');
    
    const WelcomeEmbed = new MessageEmbed()
    .setTitle('Welcome')
    .setColor(`FFFFF`)
    .setImage(member.user.displayAvatarURL({ format: 'png', dynamic: true }))
    .addField(`**Name**`, member.displayName)
    .addField(`**ID**`, member.id)
    .addField(`**Account Created On**`, moment.utc(member.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss'))
    .setTimestamp()
    welcomechannel.send(WelcomeEmbed)

})

client.on('guildMemberRemove', async member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'leave');

    channel.send(`leaved server, ${member}`);
})

client.login(Botconfig.token)