const discord = require('discord.js');

const { Op } = require('sequelize');
const { Logs } = require("../../utils/DatabaseObjects")

module.exports = {
    name: 'kick',
    description: 'Kicks mentioned user.',
    example: '!!kick @user',
    execute(message, arguments) {
        if (!message.mentions.users.size) {
            return message.channel.send(`No arguments given. Usage: ${this.example}`)
        } else {
            const toKick = message.mentions.members.first();
            if (!message.member.hasPermission(['KICK_MEMBERS', 'ADMINISTRATOR'])) {
                return message.reply("you cannot kick members");
            } else if (toKick.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS', 'ADMINISTRATOR'])) {
                return message.reply("you cannot kick this member");
            }
            toKick.kick().then((member) => {
                message.channel.send(`:wave: ${member.displayName} has been kicked!`);
            })
            Logs.create({ guild_id: message.guild.id, command: this.name, type: 'moderation', executor: message.author.id, mentioned: toKick.user.id })
        }
    }
}