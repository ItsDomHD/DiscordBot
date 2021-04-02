const Discord = require('discord.js');
module.exports.run = async (Client, interaction, args) => {
    let user;
    if (args == undefined) {
        user = await Client.users.fetch(interaction.member.user.id);
    } else {
        user = await Client.users.fetch(args.find(arg => arg.name.toLowerCase() == "user").value);
    }
    let guild = Client.guilds.cache.get(interaction.guild_id);
    let member = await guild.members.fetch(user.id);
    let roles = member.roles.cache.map(r => `${r}`).join(" | ").replace(" | @everyone", "").replace("@everyone", "No Roles.");
    if (roles.length > 500) roles = "Too many roles.";

    const embed = new Discord.MessageEmbed()
        .setColor("AQUA")
        .setThumbnail(user.avatarURL({dynamic: true}))
        .addField(`User`, `${user.tag} (ID: ${user.id})`)
        .addField(`Roles [${member.roles.cache.size - 1}]`, roles)
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
    name: 'userinfo',
    description: 'Shows information about a user.',
    options: [
        {
            name: 'User',
            description: 'If mentioned, shows the information about the user.',
            type: 6,
            required: false
        }
    ]
};
/* TYPES:
NAME	                VALUE
SUB_COMMAND	                1
SUB_COMMAND_GROUP	        2
STRING	                    3
INTEGER	                    4
BOOLEAN	                    5
USER	                    6
CHANNEL	                    7
ROLE	                    8
*/