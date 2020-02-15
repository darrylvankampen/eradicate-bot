const { errors } = require("../configuration.json")

module.exports = (client, message) => {
    if (!message.content.startsWith(client.config.prefix) || message.author.bot) return;

    const args = message.content.slice(client.config.prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;

    try {
        client.commands.get(command).execute(message, args);
    } catch (error) {
        console.error(error);
        var randomError = errors[Math.floor(Math.random() * errors.length)]
        message.reply(randomError);
    }
}