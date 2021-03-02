import { DiscordUser } from "./DiscordUser.js";
import { FileNotFoundError } from "./FileNotFoundError.js";
import fs from "fs";
import { use } from "chai";

/**
 * @class The scheduled meeting that will remind participants.
 */
export class Reminder {    
    /**
     * The reminder's constructor.
     * @param {{id:number|string,members:DiscordUser[]|string[]|number[],time:Date|number}} reminderData
     * The members of the scheduled meeting and the start of it.
     */
    constructor({ id, members, time }) {
        this.remindersDir = "./data/reminders/";
        if (id === undefined) {
            const usedIds = this.getUsedIds();
            let proposedId = 1;
            while (usedIds.includes(`${proposedId}`)) {
                proposedId++;
            }
            this.id = proposedId;
        } else {
            this.id = id instanceof String ? id : `${id}`;
        }

        if (members === undefined || time === undefined) {
            throw new TypeError("Both members and time need to be specified.");
        }
        this.members = [];
        members.forEach(member => {
            this.members.push(member instanceof DiscordUser ? member : new DiscordUser(member));
        });

        this.time = time instanceof Date ? time : new Date(time);
    }

    /**
     * 
     * @param {import('./PendingMessages.js').PendingMessages} pendingMessages 
     * The object that registers new Timeouts.
     */
    schedule(pendingMessages) {
            // Idee, um die TimeOut zu storen: neues Objekt, das übergeben werden muss:
        // als Map ID auf TimeOut
        // Timeout ID: https://stackoverflow.com/questions/3627502/how-can-i-show-a-list-of-every-thread-running-spawned-by-settimeout-setinterval
        // https://stackoverflow.com/questions/47548081/send-scheduled-message
    }

    
    getUsedIds() {
        let ids = [];
        let taskFilePaths = fs.readdirSync(this.remindersDir);
        for (let taskFilePath of taskFilePaths) {
            let parsedJson = Reminder.fromJson(taskFilePath);
            ids.push(parsedJson.id);
        }
    
        return ids;
    }

    getTimeUnix() {
        return parseInt((this.time.getTime() / 1000).toFixed(0));
    }

    /**
     * 
     * @param {import('discord.js')} client Der Client, mit dem die Nachricht
     * gesendet werden kann.
     */
    sendReminderMessage(client) {

    }

    /**
     * Creates a `Reminder` from a file.
     * @param {string} fileName The file name.
     * @returns {Reminder} The reminder.
     * @throws {FileNotFoundError} If there is no file using this file name.
     */
    static fromJson(fileName) {
        const remindersDir = "./data/reminders/";
        if (!fs.readdirSync(remindersDir).includes(fileName)) {
            throw new FileNotFoundError(remindersDir + fileName);
        }

        let json = JSON.parse(fs.readFileSync(`./data/reminders/${fileName}`, "utf-8"));
        return new Reminder(json);
    }

    /**
     * Writes the `Reminder` to disk.
     */
    toJson() {
        // Delete beforehand in case of update
        try {
            fs.unlinkSync(`${this.remindersDir}${this.id}.json`);
        } catch (e) { 
            console.log(`Reminder ${this.id} is completely new. No old version to delete.`);
        }

        const jsonString = JSON.stringify({ 
            id: this.id, 
            time: this.getTimeUnix(),
            members: this.members.map(user => user.getId())
        });
        fs.writeFileSync(`${this.remindersDir}${this.id}.json`, jsonString, 'utf8');
    }


    /**
     * Get the ID.
     * @returns {number} The ID.
     */
    getId() {
        return this.id;
    }

    /**
     * Get the members of the meeting.
     * @returns {DiscordUser[]} The members.
     */
    getMembers() {
        return this.members;
    }

    /**
     * Get the time and date of the meeting.
     * @returns {Date} The date of the meeting.
     */
    getTime() {
        return this.time;
    }
}