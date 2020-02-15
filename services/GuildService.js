const Sequelize = require('sequelize');
const { database } = require('../configuration.json');
const { Guilds } = require('../utils/DatabaseObjects')

class GuildActions {
    constructor() { }

    async addGuild(addedGuild) {
        const guild = await this.findById(addedGuild.id)
        if (!guild) {
            Guilds.create({ guild_id: addedGuild.id, name: addedGuild.name })
        }
    };

    async removeGuild(removedGuild) {
        const guild = await this.findById(removedGuild.id);
        if (guild) {
            guild.destroy();
        }
    }

    async findById(id) {
        return Guilds.findOne({
            where: {
                guild_id: id
            }
        })
    }
}

module.exports = GuildActions;