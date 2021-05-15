const { Client, Collection } = require("discord.js");
const fs = require("fs");
const botConfig = require('./storage/config.json')

class client extends Client {
  constructor() {
    super({ disableMentions: "everyone" });
    this.commands = new Collection();

    this.on("ready", () => {
      
      console.log("Bot is online");
      this.user.setPresence({
        status: "online",
        activity: {
          name: "youtube",
          type: "STREAMING"
        }
      })
       

    });

    this.on("message", async (message) => {
     
     const prefix = botConfig.prefix
      if (!message.content.startsWith(prefix) || message.author.bot) return;
      const args = message.content.slice(prefix.length).split(/ +/);
      const command = args.shift().toLowerCase();

      if (!this.commands.has(command)) return;

      try {
        this.commands.get(command).execute(this, message, args);
      } catch (error) {
        message.channel.send(
          `An error occured while executing that command Error: ${error}`
        );
      }
    });
  }

  loadCommands() {
    const commandFiles = fs
      .readdirSync("./commands")
      .filter((file) => file.endsWith(".js"));
    for (const file of commandFiles) {
      const command = require(`./commands/${file}`);
      this.commands.set(command.name, command);
    }
  }

  run() {
    super.login(botConfig.token);
    this.loadCommands();
  }
}

module.exports = client;
