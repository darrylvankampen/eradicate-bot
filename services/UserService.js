const Discord = require('discord.js');
const Sequelize = require('sequelize');
const { Users } = require('../utils/DatabaseObjects');
const userList = new Discord.Collection();

class UserService {
    constructor() { }

    async addUser(id) {
        console.log(id)
        const user = await Users.findOne({
            where: {
                user_id: id
            }
        });
        if (!user) {
            const newUser = await Users.create({ user_id: id });
            userList.set(id, newUser);
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

module.exports = UserService;