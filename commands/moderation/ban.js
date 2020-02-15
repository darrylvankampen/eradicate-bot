const discord = require('discord.js');

const { Op } = require('sequelize');
const { Logs } = require("../../utils/DatabaseObjects")

module.exports = {
    name: 'ban',
    description: 'Bans mentioned user.',
    example: '!!ban @user',
    execute(message, arguments) {
        if (!message.mentions.users.size) {
            return message.channel.send(`No arguments given. Usage: ${this.example}`)
        } else {
            const toBan = message.mentions.members.first();
            if (!message.member.hasPermission(['BAN_MEMBERS', 'ADMINISTRATOR'])) {
                return message.reply("you cannot ban members");
            } else if (toBan.hasPermission(['BAN_MEMBERS', 'BAN_MEMBERS', 'ADMINISTRATOR'])) {
                return message.reply("you cannot ban this member");
            }
            toBan.ban().then((member) => {
                message.channel.send(`:wave: ${member.displayName} has been banned!`);
            })
            Logs.create({ guild_id: message.guild.id, command: this.name, type: 'moderation', executor: message.author.id, mentioned: toBan.user.id })
        }
    }
}