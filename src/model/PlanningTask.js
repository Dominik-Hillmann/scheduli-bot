
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
    constructor({ id, members, timeFrames }) {
        if (id === undefined) {
            const usedIds = this.getUsedIds();
            this.id = 1;
            while (usedIds.includes(this.id)) {
                this.id++;
            }            

        } else {
            this.id = id;
        }


        this.members = members;
        

        if (timeFrames === undefined) {
            /**
             * The time frames collected or to be collected.
             * @type {TimeFrame[]}
             * @private
             */
            this.timeFrames = Array.from({length: this.members.length}).map(x => []);
        } else {
            this.timeFrames = timeFrames;
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
        return this.members;
    }

    /**
     * Adds a time frame for a certain user.
     * @param {DiscordUser} user The user for which time frame is added.
     * @param {TimeFrame}} timeFrame The frame to be added.
     * @throws {TypeError} If the user does not exist.
     */
    addTimeFrame(user, timeFrame) {
        let userIndex = 0;
        let found = false;
        for (let searchedUser of this.members) {
            if (searchedUser.getId() === user.getId()) {
                found = true;
                break;
            }
            userIndex++;
        }

        if (!found) {
            throw new TypeError(`User ${user.getId()} not found.`);
        }

        this.timeFrames[userIndex].push(timeFrame);
    }

    /**
     * Gets the time frames of the given users.
     * @param {string|DiscordUser} user The user for which to collect time frames.
     * @returns {TimeFrame[]} The time frames of the user.
     */
    getTimeFrames(user) {
        let wantedId = null;
        if (user instanceof DiscordUser) {
            wantedId = user.getId();
        } else {
            wantedId = user;
        }

        let foundIndex = -1;
        let currentIndex = 0;
        for (let user of this.members) {
            const userId = user.getId();
            if (userId === wantedId) {
                foundIndex = currentIndex;
                break;
            }

            currentIndex++;
        }

        if (foundIndex === -1) {
            throw new TypeError(`Did not find user ${user}.`);
        }

        return this.timeFrames[foundIndex];
    }

    /**
     * @returns {boolean} Whether every user is assigned at least one time frame.
     */
    allFramesCollected() {
        for (let timeFrame of this.timeFrames) {
            if (timeFrame.length === 0) {
                return false;
            }
        }

        return true;
    }

    /**
     * Writes a JSON file version of this class to disk.
     */
    toJson() {
        let json = { id: this.id, timeFrames: {} };
        const tasksDir = './data/tasks/';
        try {
            fs.unlinkSync(`${tasksDir}${this.id}.json`);
        } catch (e) { 
            // console.log(`Task ${this.id} is completely new. No old version to delete.`);
        }

        const userIds = this.members.map(user => user.getId());

        for (let i = 0; i < userIds.length; i++) {
            json.timeFrames[userIds[i]] = this.timeFrames[i].map(frame => frame.toJsonFriendly());
        }

        const jsonString = JSON.stringify(json);
        fs.writeFileSync(`${tasksDir}${this.id}.json`, jsonString, 'utf8');
    }

    /**
     * Returns the IDs of all meetings in plannung.
     * @returns {string[]} The IDs.
     */
    getUsedIds() {
        const dataPath = './data/tasks/';
        let ids = [];
        let taskFilePaths = fs.readdirSync(dataPath);
        for (let taskFilePath of taskFilePaths) {
            let parsedJson = PlanningTask.fromJson(`${dataPath}${taskFilePath}`);
            ids.push(parsedJson.id);
        }
    
        return ids;
    }

    /**
     * 
     * @param {string} path The path.
     * @returns {{id: number, timeFrames: Map<string, {start: number, end: number}[]>}} Simple object
     * that .
     */
    static simpleFromJson(path) {
        let json = fs.readFileSync(path, "utf-8");
        return JSON.parse(json);
    } 

    /**
     * Parses a JSON to a `PlanningTask` object.
     * @param {string} path The path to the *.json file to be parsed.
     * @returns {PlanningTask} The parsed task. 
     */
    static fromJson(path) {
        const parsedJson = this.simpleFromJson(path);
        
        const users = [];
        const timeFrames = [];
        for (let userId of Object.keys(parsedJson.timeFrames)) {
            users.push(new DiscordUser(userId));

            const userTimeFrames = [];
            for (let timeFrame of parsedJson.timeFrames[userId]) {
                userTimeFrames.push(new TimeFrame(timeFrame));
            }
            timeFrames.push(userTimeFrames);
        }

        return new PlanningTask({
            id: parsedJson.id,
            members: users,
            timeFrames: timeFrames
        });
    }
}
