module.exports.run = async (Client, interaction) => {

    const {options} = interaction.data

    const args = {}

    user = await Client.users.fetch(interaction.member.user.id);
    dev = require("../config.json").dev;


    if (options) {
        for (const option of options) {
            const {name, value} = option
            args[name] = value
        }
    }

    for (const arg in args) {
        const value = args[arg]

        if (value === "database" && user.id === dev) {

            const debugDB = require("../functions/debugDB")
            debugDB.db()

            return Client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: "Please check the console (Database Debug)"
                    }
                }
            });
        } else if (value === "command" && user.id === dev) {

            const debugCMD = require("../functions/debugCMD")
            debugCMD.cmd()

            return Client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: "Please check the console (Command Debug)"
                    }
                }
            });
        } else {
            return Client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: "You are not authorized to use this command!"
                    }
                }
            });
        }
    }
};
module.exports.help = {
    name: 'debug',
    description: 'Debug for custom bot.',
    options: [
        {
            name: 'type',
            description: 'The type of debug',
            type: 3,
            required: true,
            choices: [
                {
                    name: "Database",
                    value: "database"
                },
                {
                    name: "Commands",
                    value: "command"
                }
            ]
        }
    ]
};