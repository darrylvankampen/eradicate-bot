const GuildService = require('../services/GuildService');

module.exports = (client, guild) => {
    const guildService = new GuildService();
    guildService.removeGuild(guild);
}