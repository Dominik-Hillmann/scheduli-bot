// require('dotenv').config();
import dotenv from "dotenv";
dotenv.config()

// const fs = require('fs');
import fs from "fs";

import { Client } from "discord.js";
// const Discord = require('discord.js');
const client = new Client();

// const chrono = require('chrono-node');
import chronoPkg from 'chrono-node';
const { parseDate } = chronoPkg;

console.log(process.env.TOKEN);
console.log(parseDate('The fourth of Jul 1776'));

import { Controller } from "./controller/Controller.js";
// const Controller = require("./controller/Controller.js");



// import { PlanningTask } from "./model/PlanningTask.js";


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
    controller.test();


    // Ausgabe der aktuell geplanten Termine.

    // const controller = new Controller();
    // controller.createPlanningTask("test");


    // let task = new PlanningTask([]);
    // PlanningTask.fromJson("./data/tasks/test-task.json")
});


client.on('message', msg => {

    let isBot = msg.author.bot;
    let calledFor = msg.content.includes('Moin');
    if (isBot || !calledFor) {
        return;
    }
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

    // let channel = msg.channel;
    // channel.startTyping(5);

    let parsedDate = parseDate(msg.content);
    console.log(parsedDate);
    if (parsedDate !== null) {
        msg.channel.send(parsedDate.toString());
    }

    
});

client.login(process.env.TOKEN);