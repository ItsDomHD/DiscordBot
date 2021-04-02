const {createConnection} = require("mysql");

    function db() {
        const database = createConnection({
            host: require('../config.json').host,
            user: require('../config.json').user,
            password: require('../config.json').password,
            database: require('../config.json').db
        })

        database.connect(function (err) {
            if (err) throw err;
            database.query("SELECT * FROM project.profile", function (err, result) {
                if (err) throw err;
                console.log("")
                console.log("==== DATABASE DEBUG ====")
                console.log(result)
                console.log("==== DONE ====")
                console.log("")
            })
        })
    }

module.exports = { db };