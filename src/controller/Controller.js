import { PlanningTask } from '../model/PlanningTask.js';
import { FileNotFoundError } from "../model/FileNotFoundError.js";
import fs from "fs";
import { DiscordUser } from '../model/DiscordUser.js';

/**
 * @class Interacts with the model on behalf of what happens in the view.
 */
export class Controller {
    constructor() {
        /** The path to the saved `PlanningTask`s. */
        this.tasksDir =  "./data/tasks/";
    }

    /**
     * Creates a new task to look for a common time frame of the given members.
     * @param {string[]|import('../model/DiscordUser.js').DiscordUser} members 
     * The IDs of the meeting members.
     * @throws {TypeError} If there are note enough memebers.
     */
    createPlanningTask(members) {
        const task = new PlanningTask({ members: members });
        task.toJson();
    }

    /**
     * Deletes the persistent `PlanningTask` that uses the ID `id`.
     * @param {number} id The task ID.
     * @throws {FileNotFoundError} If there is not task saved using the ID `id`.
     */
    deletePlanningTask(id) {
        const tasksFileNames = fs.readdirSync(this.tasksDir);
        const taskName = `${id}.json`;
        if (!tasksFileNames.includes(taskName)) {
            throw new FileNotFoundError(this.tasksDir + taskName);
        }
        
        const task = PlanningTask.fromJson(`${this.tasksDir}${id}.json`);
        task.deleteJson();
    }

    /**
     * Adds a possible time frame at which a user is available for a meeting.
     * @param {number} userId The user's ID.
     * @param {import('../model/TimeFrame.js').TimeFrame} timeFrame The time frame
     * the user wants to add. 
     * @throws {TypeError} If the `userId`, if the there is currently no task using this ID.
     */
    addTimeFrame(userId, timeFrame) {
        let task = null;
        fs.readdirSync(this.tasksDir).forEach(fileName => {
            let currentTask = PlanningTask.fromJson(this.tasksDir + fileName);
            const users = currentTask.getUsers().map(user => user.getId());
            if (users.includes(userId)) {
                task = currentTask;
                return;
            }
        });

        if (task === null) {
            throw new TypeError(`Could not find Planning Task with user "${userId}".`);
        }

        const user = new DiscordUser(`${userId}`);
        task.addTimeFrame(user, timeFrame);
        task.toJson();
    }

    /**
     * Deletes a peristent reminder for a meeting.
     * @param {number} id The reminder ID.
     */
    deleteReminder(id) {

    }

    setReminders() {
        
    }
}