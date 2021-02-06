const https = require('https');

const options = {
    hostname: 'discord.com',
    path: '/api/v8/applications/806920983969660988/guilds/758996468534214667/commands/806922638605811782',
    headers: {
        Authorization: require('../config.json').http
    },
    method: 'Delete'
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