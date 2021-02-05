module.exports.run = async (Client, interaction, args) => {
    return Client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
            type: 4,
            data: {
                content: 'Pong'
            }
        }
    });
};
module.exports.help = {
    name: 'ping',
    description: 'Pong',
    options: []
};