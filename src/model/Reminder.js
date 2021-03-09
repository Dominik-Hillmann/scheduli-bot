import { DiscordUser } from "./DiscordUser.js";
import { MessageEmbed } from "discord.js";
import { FileNotFoundError } from "./FileNotFoundError.js";
import fs from "fs";

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
            while (usedIds.includes(proposedId)) {
                proposedId++;
            }
            this.id = proposedId;
        } else {
            this.id = id instanceof String ? parseInt(id) : id;
        }

        if (members === undefined || time === undefined) {
            throw new TypeError("Both members and time need to be specified.");
        }
        this.members = [];
        members.forEach(member => {
            this.members.push(member instanceof DiscordUser ? member : new DiscordUser(member));
        });

        this.time = time instanceof Date ? time : new Date(time * 1000);
    }
    
    /**
     * Schedules the reminder message.
     * @param {import("discord.js").Client} client The Discord client.
     * @param {string} targetChannelId The target ID of the channel. 
     * @returns {"The timeout ID"} The ID as returned by `setTimeout`.
     */
    schedule(client, targetChannelId) {
        const currentTimeUnix = Reminder.getCurrentTimeUnix();
        const secsToMsg = (this.getTimeUnix() - currentTimeUnix) * 1000; // in milliseconds

        const timeoutId = setTimeout((client, targetChannelId) => {
            client.channels.fetch(targetChannelId).then(channel => {
                const reminderMsg = new MessageEmbed()
                .setColor("#8af542")
                .setTitle("Reminder")
                .setDescription("You have an upcoming meeting.")
                .addFields(this.members.map(member => ({
                    name: member.getMention(),
                    value: "You have an upcoming meeting. " + member.getMention(),
                    inline: true
                })));
                
                channel.send(reminderMsg);
            });
        }, secsToMsg, client, targetChannelId);

        return timeoutId;
    }

    /**
     * Get all the used IDs of the `Reminder` files.
     * @returns {number[]} The used IDs.
     */
    getUsedIds() {
        let ids = [];
        let taskFilePaths = fs.readdirSync(this.remindersDir);
        for (let taskFilePath of taskFilePaths) {
            let parsedJson = Reminder.fromJson(taskFilePath);
            ids.push(parseInt(parsedJson.id));
        }
    
        return ids;
    }

    getTimeUnix() {
        return parseInt((this.time.getTime() / 1000).toFixed(0));
    }

    static getCurrentTimeUnix() {
        return parseInt((new Date().getTime() / 1000).toFixed(0));
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
        // console.log(this.id instanceof String, this.id);
        // return this.id instanceof String ? parseInt(this.id) : this.id;
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

    /**
     * Deletes the JSON file belonging to this reminder.
     */
    deleteJson() {        
        fs.unlinkSync(`./data/reminders/${this.id}.json`);
    }
}