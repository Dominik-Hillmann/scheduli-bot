
import { DiscordUser } from "../model/DiscordUser.js";
import fs from "fs";
import { TimeFrame } from "./TimeFrame.js";

/** @class Collects the wanted time frames of the user. */
export class PlanningTask {
    /**
     * 
     * @param {{id: number|undefined, members: DiscordUser[], timeFrames: TimeFrame[][]}} taskData
     * @throws {TypeError}  If users and frames do not have the same length.
     */
    constructor(taskData) {
        console.log(taskData);
        if (taskData.id === undefined) {
            const usedIds = this.getUsedIds;
            /**
             * The user's ID.
             * @type {number}
             * @private
             */
            this.id = 1;
            while (usedIds.includes(this.id)) {
                this.id++;
            }            

        } else {
            this.id = taskData.id;
        }

        /**
         * The users for which a task is planned.
         * @type {DiscordUser[]}
         * @private 
         */
        this.members = taskData.members;

        if (taskData.timeFrames === undefined) {
            /**
             * The time frames collected or to be collected.
             * @type {TimeFrame[]}
             * @private
             */
            this.timeFrames = Array.from({length: 5}).map(x => []);
        } else {
            this.timeFrames = taskData.timeFrames;
        }


        if (this.members.length !== this.timeFrames.length) {
            throw new TypeError("Time frames and users array have to be the same length.");
        }
    }

    /**
     * @returns {number} The ID of this `PlanningTask`.
     */
    getId() {
        return this.id;
    }

    /**
     * All users for which timeframes have to be collected.
     * @returns {DiscordUser[]} The users.
     */
    getUsers() {

    }

    /**
     * Gets the time frames of the given users.
     * @param {string|DiscordUser} user The user for which to collect time frames.
     * @returns {TimeFrame[]}
     */
    getTimeFrames(user) {

    }

    /**
     * 
     * @param {string|DiscordUser} user 
     * @param {TimeFrame} timeFrame 
     */
    addTimeFrame(user, timeFrame) {

    } 

    /**
     * @returns {boolean} Whether every user is assigned at least one time frame.
     */
    allFramesCollected() {

    }

    /**
     * Writes a JSON file version of this class to disk.
     */
    toJson() {

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
}
