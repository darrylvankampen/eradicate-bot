const GuildService = require('../services/GuildService');


module.exports = (client, guild) => {
    const guildService = new GuildService();
    guildService.addGuild(guild);
    sendFirstMessage();

    function sendFirstMessage() {
        var defaultChannel = "";
        guild.channels.forEach((channel) => {
            if (channel.type == "text" && defaultChannel == "") {
                if (channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
                    defaultChannel = channel;
                }
            }
        });
        defaultChannel.send(`Eradicate has arrived to help you. :robot:`, {
            embed: {
                title: 'Eradicate\'s welcome message',
                description: "The prefix for using Eradicate is !!. For example: !!kick",
                fields: [
                    {
                        "name": "Help",
                        value: "The commands for Eradicate can be found with !!help"
                    },
                    {
                        "name": "Contact",
                        "value": "If you need help with Eradicate or you noticed something weird. Feel free to contact me: darihon#4369"
                    }
                ],
                footer: {
                    text: 'Eridicate created and developed by darihon#4369'
                }
            }
        });
    }
}


