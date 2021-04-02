module.exports.run = async (Client, interaction) => {

    const {options} = interaction.data

    const args = {}

    if (options) {
        for (const option of options) {
            const {name, value} = option
            args[name] = value
        }
    }

    for (const arg in args) {

        const debugDB = require("../functions/debugDB")

        debugDB.db()

        const value = args[arg]
        if (value === "database") {
            return Client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: "Please check the console (Database Debug)"
                    }
                }
            });
        } else if (value === "command") {

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