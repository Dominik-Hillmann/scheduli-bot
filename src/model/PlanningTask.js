
import { DiscordUser } from "../model/DiscordUser.js";
import fs from "fs";
import { TimeFrame } from "./TimeFrame.js";

export class PlanningTask {
    /** The invited people to the planned meeting. */

    /**
     * @param {{id: number|undefined, members: DiscordUser[], timeFrames: TimeFrame[]}} taskData
     */
    constructor(taskData) {
        console.log(taskData);
        if (taskData.id === undefined) {
            const usedIds = this.getUsedIds;
            this.id = 1;
            while (usedIds.includes(this.id)) {
                this.id++;
            }            

        } else {
            this.id = taskData.id;
        }

        this.members = taskData.members;

        // const usedIds = this.getUsedIds();
        // this.id = 1;
        // while (usedIds.contains(this.id)) {
        //     this.id++;
        // }

        // this.meetingMembers = members;
    }

    toJson() { }

    /**
     * Parses a JSON to a `PlanningTask` object.
     * @param {string} path The path to the *.json file to be parsed.
     * @returns {PlanningTask} The parsed task. 
     */
    static fromJson(path) {
        let parsedJson = this.simpleFromJson(path);
        
        let users = [];
        for (let userId of parsedJson.timeFrames.keys()) {
            users.push(new DiscordUser(userId));
        }

        return new PlanningTask({
            id: parsedJson.id,
            members: users
        });
    } 

    /**
     * @param {string} The path.
     * @returns {{id: number, timeFrames: Map<string, string>}} path 
     */
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
