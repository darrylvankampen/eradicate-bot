const { Op } = require('sequelize');
const { Logs } = require("../../utils/DatabaseObjects")

module.exports = {
    name: 'mock',
    description: 'Mocks mentioned user.',
    example: '!!mock @user i am mocking you',
    imageUrl: 'https://imgflip.com/s/meme/Mocking-Spongebob.jpg',
    execute(message, arguments) {
        if (!message.mentions.users.size) {
            return message.channel.send(`No arguments given. Usage: ${this.example}`)
        } else if (arguments.size < 2) {
            return message.channel.send(`This command needs a mention and atleast one word. Usage: ${this.example}`)
        } else {
            const toMock = message.mentions.members.first();
            let tempString = "";
            for (let i = 1; i < arguments.length; i++) {
                tempString += ` ${arguments[i]}`
            }
            let endResult = "";
            for (let char of tempString) {
                var random = Math.random() >= 0.35;
                if (char !== " ") {
                    if (random) {
                        endResult += char.toUpperCase();
                    } else {
                        endResult += char.toLowerCase();
                    }
                } else {
                    endResult += " ";
                }
            }
            message.channel.send(`${arguments[0]} ${endResult}`, {
                file: `${this.imageUrl}`
            })
        }
    }
}