// require('dotenv').config();
import dotenv from "dotenv";
dotenv.config()

// const fs = require('fs');
import fs from "fs";

import { CommandInterpreter } from "./view/CommandInterpreter.js";

import { Client } from "discord.js"; 
const client = new Client();

// const chrono = require('chrono-node');
import chronoPkg from 'chrono-node';
const { parseDate } = chronoPkg;

console.log(process.env.TOKEN);
console.log(parseDate('The fourth of Jul 1776'));

import { Controller } from "./controller/Controller.js";

client.on('ready', () => {
    // let prescence = new 
    client.user.setPresence({
        status: "online",
        activity: {
            name: 'the calendar 🗓️',
            type: "WATCHING",
            url: "https://www.brainrain-rain.com"
        }
    });
    console.log('ready');
    console.log();
    fs.readdirSync(".").forEach(file => {
        console.log(file);
    });


    const controller = new Controller();
    // controller.test();


    // Ausgabe der aktuell geplanten Termine.

    // const controller = new Controller();
    // controller.createPlanningTask("test");


    // let task = new PlanningTask([]);
    // PlanningTask.fromJson("./data/tasks/test-task.json")
});


client.on('message', msg => {
    let isBot = msg.author.bot;
    // let calledFor = msg.content.includes('Moin');
    if (isBot) return;
    console.log(msg.mentions.members.keys());
    // for (let mention of msg.mentions) {
    //     msg.channel.send(
    //         $`Das ist ein Test `
    //     );
    // }

    for (let id of msg.mentions.members.keys()) {
        console.log(id);
        msg.channel.send(`<@${id}>`)
    }
    

    msg.pin('Einfach so');
    msg.react('📌')
    msg.channel.send('Das ist ein Test');

    const controller = new Controller();
    const interpreter = new CommandInterpreter(controller);
    
    let re;
    try {
        re = interpreter.handle(msg);
    } catch (e) {
        if (e instanceof TypeError) {
            msg.reply(e.message);
        }
    }

    if (re !== undefined) {
        // Did not change model
        msg.channel.send(re);
    } else {

        // did change the model
    }

    // let channel = msg.channel;
    // channel.startTyping(5);

    let parsedDate = parseDate(msg.content);
    console.log(parsedDate);
    if (parsedDate !== null) {
        msg.channel.send(parsedDate.toString());
    }


    const id = msg.channel.id;
    client.channels.fetch(id);
    console.log("Nachricht", msg.channel.id);
    console.log("ID", id);
    client.channels.fetch(id).then(channel => console.log("Fetch", channel.id));
    // console.log("Fetch", chan);










    
    
});

client.login(process.env.TOKEN);