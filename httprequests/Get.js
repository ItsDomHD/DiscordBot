const https = require('https');

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
        obj=JSON.parse(result);
        obj.forEach((item) => {
            console.log('name: ' + item.name);
            console.log('description: ' + item.description);
            console.log('id: ' + item.id);
            console.log('=========================');
        });
    });

});