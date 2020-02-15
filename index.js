const discord = require('discord.js');
const config = require('./configuration.json');
const fs = require('fs');
var path = require('path');

const client = new discord.Client();
client.commands = new discord.Collection();
client.config = config;

fs.readdir("./events/", (err, files) => {
    if (err) return console.log(err);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client))
    })
});

var getCommands = function (directory) {
    var commands = [];
    fs.readdirSync(directory).forEach((file) => {
        file = path.resolve(directory, file);
        var current = fs.statSync(file);

        if (current.isDirectory()) {
            commands = commands.concat(getCommands(file))
        } else if (current.isFile() && file.endsWith(".js")) {
            commands.push(file);
        }
    });
    return commands;
}

function setCommands() {
    const commandFiles = getCommands("./commands");
    for (const cmd of commandFiles) {
        const command = require(cmd);
        client.commands.set(command.name, command)
    }
}

setCommands();

client.login(config.token);
