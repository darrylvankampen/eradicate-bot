const Discord = require('discord.js');
const Sequelize = require('sequelize');
const { Currency } = require('../utils/DatabaseObjects');
const currencyList = new Discord.Collection();

class CurrencyService {
    constructor() { }

    async addCurrency(id, amount) {
        const user = currencyList.get(id);
        if (user) {

        }
    }

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

module.exports = CurrencyService;