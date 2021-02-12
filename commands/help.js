const Discord = require('discord.js');
const https = require('https');

let cmdInfo = [];

const options = {
    hostname: 'discord.com',
    path: '/api/v8/applications/806920983969660988/guilds/' + require('../config.json').guildsid + '/commands',
    headers: {
        Authorization: require('../config.json').http
    },
    method: 'Get'
}

https.get(options, (response) => {
    var result = ''
    response.on('data', function (chunk) {
        result += chunk;
    });

    response.on('end', function () {
        obj = JSON.parse(result);
        obj.forEach((item) => {
            cmdInfo.push('**' + item.name + '**' + '  |  ' + '`' + item.id + '`' + '\n' + item.description + '\n');
        });
    });
});

module.exports.run = async (Client, interaction) => {

    const embed = new Discord.MessageEmbed()
        .setColor("RED")
        .addField(`Command Name: `, cmdInfo)
        .setTimestamp();

    Client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
            type: 4,
            data: await createAPIMessage(interaction, embed)
        }
    });

    async function createAPIMessage(interaction, content) {
        const apiMessage = await Discord.APIMessage.create(Client.channels.resolve(interaction.channel_id), content)
            .resolveData()
            .resolveFiles();
        return {...apiMessage.data, files: apiMessage.files};
    }
};

module.exports.help = {
    name: 'help',
    description: 'Shows a list of commands and their ids',
    options: []
};