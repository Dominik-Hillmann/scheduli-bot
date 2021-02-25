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
    }

    /**
     * Interpretes what to do with a message.
     * @param {import('discord.js').Message} msg The message sent in any channel.
     * @throws {TypeError} If message does not use the correct prefix.
     */
    handle(msg) {
        const calledFor = msg.content.startsWith(this.prefix);
        if (!calledFor) {
            const errMsg = `Message does not use ${this.prefix} as a prefix.`;
            throw new TypeError(errMsg);
        
        } 
        
        // Einmal alle Befehle, die das model ändern und an den Controller
        // weitergegeben werden müssen
        // schedule, delete PlanningTask, addTimeFrame, deletReminder

        // Dann noch alle Befehle, die informieren sollen und nicht das Model
        // verändern.
        // list tasks, del task, list commands, list reminder

    }
}