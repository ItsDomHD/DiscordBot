const Discord = require('discord.js');
module.exports.run = async (Client, interaction, args) => {
    await Client.users.channel.messages.fetch({limit: args[0]}).then(messages => {
        Client.users.channel.bulkDelete(messages);
    })
};
module.exports.help = {
    name: 'clear',
    description: 'Clear the chat you are in.',
    options: [
        {
            name: 'lines',
            description: 'How many lines to clear?',
            type: 4,
            required: true
        }
    ]
};