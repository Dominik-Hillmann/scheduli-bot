import { MessageEmbed } from "discord.js";
import fs from "fs";
import chronoPkg from 'chrono-node';
const { parseDate } = chronoPkg;

import { PlanningTask } from "../model/PlanningTask.js";
import { TimeFrame } from "../model/TimeFrame.js";

/**
 * @class Takes the strings of the message and calls the correct `Controller` 
 * method that fits the command.
 */
export class CommandInterpreter {
    /**
     * The `CommandInterpreter` constructor.
     * @param {import('../controller/Controller.js').Controller} controller The 
     * controller that orchestrates the model classes. 
     * @param {string} prefix The string with which a command to the scheduli
     * bot has to start. 
     */
    constructor(controller, prefix = "!scheduli") {
        this.controller = controller;
        this.prefix = prefix;
        this.embedColor = "#eb4034";
    }

    /**
     * Interpretes what to do with a message.
     * @param {import('discord.js').Message} msg The message sent in any channel.
     * @returns {string|null} If the message does not command to access the 
     * controller, it will return the wanted information immediatly and will
     * stay within the `view` module.
     * @throws {TypeError} If message does not use the correct prefix.
     */
    handle(msg) {
        const command = this.removePrecedingWhiteSpace(msg.content);
        const calledFor = command.startsWith(this.prefix);
        if (!calledFor) {
            const errMsg = `Message does not use ${this.prefix} as a prefix.`;
            throw new TypeError(errMsg);
        } 
        
        let restCommand = command.slice(this.prefix.length);
        restCommand = this.removePrecedingWhiteSpace(restCommand);
        restCommand = this.removeTrailingWhiteSpace(restCommand);
        

        if (restCommand === "list commands") {
            return this.getCommandList();

        } else if (restCommand === "list reminders") {
            return this.getReminderList();

        } else if (restCommand === "list tasks") {
            return this.getTaskList();

        } else if (restCommand.startsWith("schedule")) {
            const wantedUsers = Object.keys(msg.mentions.members);
            if (wantedUsers.length === 0) {
                throw new TypeError("The schedule command has to have at least one user mention.");
            }

            this.controller.createPlanningTask(wantedUsers);

        } else if (restCommand.startsWith("del task")) {
            let id = restCommand.slice("del task".length);
            id = this.removePrecedingWhiteSpace(this.removeTrailingWhiteSpace(id));
            id = parseInt(id);
            if (isNaN(id)) {
                throw new TypeError("No valid ID given to task deletion command.");
            }
            
            this.controller.deletePlanningTask(id);

        } else if (restCommand.startsWith("add")) {
            const writtenDate = restCommand.slice("add".length);
            const startIdxTo = writtenDate.toLowerCase().indexOf("to");
            const start = parseDate(writtenDate.slice(0, startIdxTo));
            const end = parseDate(writtenDate.slice(startIdxTo));
            if (start === null || end === null) {
                throw new TypeError("Not enough informations given to parse dates.");
            }
            
            this.controller.addTimeFrame(msg.author.id, new TimeFrame({
                start: start, 
                end: end
            }));

        } else if (restCommand.startsWith("del reminder")) {
            let id = restCommand.slice("del reminder".length);
            id = this.removePrecedingWhiteSpace(this.removeTrailingWhiteSpace(id));
            id = parseInt(id);
            if (isNaN(id)) {
                throw new TypeError("No valid ID given to reminder deletion command.");
            }
            
            this.controller.deleteReminder(id);

        } else {
            throw new TypeError("Not a command.");
        }
    }

    /**
     * Removes the white space in front of a string.
     * @param {string} s The string to be trimmed.
     * @returns {string} The trimmed string.
     */
    removePrecedingWhiteSpace(s) {
        while (s.startsWith(" ")) {
            s = s.slice(1);
        }

        return s;
    }

    /**
     * Removes the white space at the end of a string.
     * @param {string} s The string to be trimmed.
     * @returns {string} The trimmed string.
     */
    removeTrailingWhiteSpace(s) {
        while (s.endsWith(" ")) {
            s = s.slice(0, s.length - 1);
        }

        return s;
    }

    /**
     * Get the command list.
     * @returns {MessageEmbed} The embedded message listing the commands.
     */
    getCommandList() {
        return new MessageEmbed()
            .setColor(this.embedColor)
            .setTitle("List of commands")
            .setDescription("All commands currently available for the Scheduli bot.")
            .addFields([{
                    name: "list commands",
                    value: "Show all available commands for tje Scheduli bot."
                }, {
                    name: "list reminders",
                    value: "Shows a list of currently pending reminders."
                }
            ]);
    }

    getReminderList() {
        // to be implemented when the Reminder class is implemented.
    }

    /**
     * Returns the list of all tasks as rich message.
     * @returns {MessageEmbed} The rich message containing the list of tasks.
     */
    getTaskList() {
        const tasksDir = "./data/tasks/";
        const readTaskNames = [];
        fs.readdirSync(tasksDir).forEach(fileName => readTaskNames.push(fileName));
        
        const tasks = [];
        readTaskNames.forEach(name => tasks.push(PlanningTask.fromJson(tasksDir + name)));
        const embedFields = [];
        tasks.forEach(task => {
            const mentions = [];
            task.getUsers().forEach(user => mentions.push(user.getMention()));
            
            embedFields.push({
                name: `Task #${task.getId()}`,
                value: `Looking for ${mentions.join(", ")}.`
            });
        });

        return new MessageEmbed()
            .setTitle("Tasks currently being planned")
            .setColor(this.embedColor)
            .setDescription("A list of all wanted meetings that the Scheduli bot is looking for.")
            .addFields(embedFields);
    }
}