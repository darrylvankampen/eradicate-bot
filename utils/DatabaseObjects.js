const Sequelize = require('sequelize');
const { database } = require('../configuration.json');

const sequelize = new Sequelize(database.name, database.username, database.password, {
    host: database.host,
    dialect: database.dialect,
    dialectOptions: {
        timezone: "Etc/GMT0"
    },
    logging: database.logging,
    storage: database.storage
});

const Guilds = sequelize.import("../models/Guild");
const Logs = sequelize.import('../models/Log');
const Users = sequelize.import('../models/Users');
const Currency = sequelize.import('../models/Currency')

Currency.belongsTo(Users, { foreignKey: 'user_id', as: 'user' })
Logs.belongsTo(Guilds, { foreignKey: 'guild_id', as: 'guild' });

Logs.prototype.addLog = async function (log) {
    console.log(log)
    const guild = await Guilds.findOne({
        where: {
            guild_id: this.guild_id
        }
    });
    if (guild) {
        return Logs.create({ guild_id: this.guild_id, command: log.command, type: log.type })
    }
}

module.exports = { Guilds, Logs, Users, Currency };