require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();

console.log(process.env.TOKEN);
client.login(process.env.TOKEN);