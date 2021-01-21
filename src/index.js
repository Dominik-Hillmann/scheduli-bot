require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();

const chrono = require('chrono-node');

console.log(process.env.TOKEN);
console.log(chrono.parseDate('The fourth of Jul 1776'));


client.on('ready', () => console.log('redy'));
client.on('message', (msg) => {
    let isBot = msg.author.bot;
    let calledFor = msg.content.includes('Moin');
    
    if (isBot || !calledFor) {
        return;
    }
    msg.pin('Einfach so');
    msg.react('📌')
    msg.channel.send('Das ist ein Test');

    let channel = msg.channel;
    // channel.startTyping(5);

    let parsedDate = chrono.parseDate(msg.content);
    console.log(parsedDate);
    if (parsedDate !== null) {
        msg.channel.send(parsedDate.toString());
    }
    // let prescence = new 
    client.user.setStatus('available');
    client.user.setPresence({
        game: {
            name: 'with depression',
            type: "STREAMING",
            url: "https://www.twitch.tv/monstercat"
        }
    });
});

client.login(process.env.TOKEN);