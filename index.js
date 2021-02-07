const Discord = require('discord.js');
const fs = require('fs');
const Client = new Discord.Client();
Client.on('ready', () => {
    console.log('Bot is up!')
    fs.readdir(`./commands/`, (error, files) => {
        if (error) return console.log(error);
        files.forEach(file => {
            if (!file.endsWith('.js')) return;
            let fileProp = require(`./commands/` + file)
            Client.api.applications(Client.user.id).guilds(require('./config.json').testGuildID).commands.post({
                data: {
                    name: fileProp.help.name,
                    description: fileProp.help.description,
                    options: fileProp.help.options
                }
            });
            Client.ws.on('INTERACTION_CREATE', async interaction => {
                const command = interaction.data.name.toLowerCase();
                const args = interaction.data.options;
                if (command == fileProp.help.name.toLowerCase()) fileProp.run(Client, interaction, args);
            });
        });
    });
});


Client.login(require('./config.json').token);