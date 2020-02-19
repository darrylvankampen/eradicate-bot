const { errors } = require("../configuration.json");
const UserService = require('../services/UserService');
const userService = new UserService();

function checkUser(author) {
    userService.addUser(author)
}

module.exports = (client, message) => {
    if (!message.content.startsWith(client.config.prefix) || message.author.bot) return;

    checkUser(message.author.id);

    const args = message.content.slice(client.config.prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    const foundCommand = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

    if (!foundCommand) return;

    try {
        foundCommand.execute(message, args)
    } catch (error) {
        console.error(error);
        var randomError = errors[Math.floor(Math.random() * errors.length)]
        message.reply(randomError);
    }
}