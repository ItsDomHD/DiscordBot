const options = {
    hostname: 'discord.com',
    path: '/api/v8/applications/806920983969660988/guilds/758996468534214667/commands/806922638965342219',
    headers: {
        Authorization: 'Bot ODA2OTIwOTgzOTY5NjYwOTg4.YBwdug.K4uBS9lF2MvuSEagLqISXsyFyhc'
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