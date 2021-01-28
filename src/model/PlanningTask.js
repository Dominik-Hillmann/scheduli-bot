
import { DiscordUser } from "../model/DiscordUser.js";
import fs from "fs";

export class PlanningTask {
    /** The invited people to the planned meeting. */

    /**
     * 
     * @param {DiscordUser[]} members 
     */
    constructor(members) {
        const usedIds = this.getUsedIds();
        this.id = 1;
        while (usedIds.contains(this.id)) {
            this.id++;
        }

        this.meetingMembers = members;
    }

    toJson() { }

    static fromJson(path) {
        // let json = fs.readFileSync(path, "utf-8");
        // return JSON.parse(json);
        // hieraus neues Objekt
    } 

    static simpleFromJson(path) {
        let json = fs.readFileSync(path, "utf-8");
        return JSON.parse(json);
    } 

    /**
     * Returns the IDs of all meetings in plannung.
     * @returns {string[]} The IDs.
     */
    getUsedIds() {
        let ids = [];
        let taskFilePaths = fs.readdirSync("./data/tasks/");
        for (let taskFilePath of taskFilePaths) {
            let parsedJson = this.fromJson(taskFilePath);
            ids.push(parsedJson.id);
        }
    
        return ids;
    }
}
