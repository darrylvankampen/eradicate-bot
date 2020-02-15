const Sequelize = require('sequelize');
const { database } = require('../configuration.json');
const mysql = require('mysql2');

var connection = mysql.createConnection({
    host: database.host,
    user: database.username,
    password: database.password,
    multipleStatements: true
});

connection.connect((err) => {
    if (err) return console.log(err)
    connection.query("DROP DATABASE IF EXISTS `eradicate`; CREATE DATABASE `eradicate`", (err, res) => {
        if (err) return console.log(err)
        syncData();
    });
})


const sequelize = new Sequelize(database.name, database.username, database.password, {
    host: database.host,
    dialect: database.dialect,
    dialectOptions: {
        timezone: "Etc/GMT0"
    },
    logging: database.logging,
    storage: database.storage
});

sequelize.import("../models/Guild");
sequelize.import("../models/Log");

const force = process.argv.includes('--force') || process.argv.includes('-f');

function syncData() {
    sequelize.sync({ force }).then(async () => {
        console.log('Database synced');
        sequelize.close();
    }).catch(console.error)
}