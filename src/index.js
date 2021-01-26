require('dotenv').config();

const fs = require('fs');

const Discord = require('discord.js');
const client = new Discord.Client();

const chrono = require('chrono-node');

console.log(process.env.TOKEN);
console.log(chrono.parseDate('The fourth of Jul 1776'));


client.on('ready', () => {
    // let prescence = new 
    client.user.setPresence({
        status: "online",
        activity: {
            name: 'the calendar 🗓️.',
            type: "WATCHING",
            url: "https://www.brainrain-rain.com"
        }
    });
    console.log('ready');
    console.log();
    fs.readdirSync(".").forEach(file => {
        console.log(file);
    });
    // Ausgabe der aktuell geplanten Termine.
});


client.on('message', msg => {
    console.log(msg.mentions);
    for (let mention of msg.mentions) {
        msg.channel.send(
            $`Das ist ein Test `
        );
    }

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

    
});

client.login(process.env.TOKEN);