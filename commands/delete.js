const Discord = require('discord.js');
const https = require('https');

module.exports.run = async (Client, interaction, args) => {

    const cmdID = args.find(arg => arg.name.toLowerCase() == "id").value;

    const options = {
        hostname: 'discord.com',
        path: `/api/v8/applications/806920983969660988/guilds/` + require('../config.json').guildsid + `/commands/` + encodeURI(cmdID),
        headers: {
            Authorization: require('../config.json').http
        },
        method: 'delete'
    }

    https.get(options, (response) => {

        var result = ''
        response.on('data', function (chunk) {
            result += chunk;
        });

        response.on('end', function () {
            console.log(result);
        });
    });

    const embed = new Discord.MessageEmbed()
        .setColor("RED")
        .addField(`Response: `, cmdID)
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
    name: 'delete',
    description: 'Deletes a command',
    options: [
        {
        name: 'id',
        description: 'The command ID',
        type: 3,
        required: true
    }
    ]
};