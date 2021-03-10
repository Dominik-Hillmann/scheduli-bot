import fs from "fs";
import { PlanningTask } from "../model/PlanningTask.js";
import { TimeFrame } from "../model/TimeFrame.js";
import { NotYetObservedError } from "./NotYetObservedError.js";

/**
 * @class After a certain is action of the `controller` is finished,
 * the `Observer` takes a look at the persistent files and determines
 * what has changed.
 */
export class Observer {
    /**
     * The Observer constructor.
     */
    constructor() {
        // All variables containing what the file system looked like at last observation.
        this.lastObservedReminderNames = [];
        this.lastObservedTaskNames = [];
        this.lastObservedTasks = {};
        // Fields that contain newly added or deleted task file names.
        this.addedTaskNames = [];
        this.deletedTaskNames = [];
        // Fields that contain newly added or delted reminder file names.
        this.addedReminderNames = [];
        this.deletedReminderNames = [];
        // How the tasks changed.
        this.taskChanges = {};
        // Whether a first observation was already undertaken.
        this.timesObserved = 0;
        // Paths to tasks and reminders.
        this.remindersDir = "./data/reminders/";
        this.tasksDir = "./data/tasks/";
    }

    /**
     * Observes the files contained in `./data/*` and internally saves the differences
     * since the last time the object observed the files. 
     */
    observe() {
        if (this.timesObserved <= 0) {
            this.updateLatest();
            this.timesObserved++;
            return;
        }
        // Comparison happens here.

        // Task differences.
        const currentTasks = fs.readdirSync(this.tasksDir);        
        this.addedTaskNames = [];
        for (let currentTask of currentTasks) {
            const isAdded = !this.lastObservedTaskNames.includes(currentTasks);
            if (isAdded) {
                this.addedTaskNames.push(currentTask);
            }
        }

        this.deletedTaskNames = [];
        for (let oldTask of this.lastObservedTaskNames) {
            const isDeleted = !currentTasks.includes(oldTask);
            if (isDeleted) {
                this.deletedTaskNames.push(oldTask);
            }
        }

        const tasksThatPossiblyChanged = {}; 
        this.lastObservedTaskNames
            .filter(taskName => currentTasks.includes(taskName))
            .map(taskName => PlanningTask.fromJson(this.tasksDir + taskName))
            .forEach(task => tasksThatPossiblyChanged[task.getId()] = task);

        const taskChanges = {};
        for (let possiblyChangedTask of Object.values(tasksThatPossiblyChanged)) {
            const possiblyChangedTaskId = possiblyChangedTask.getId();
            taskChanges[possiblyChangedTaskId] = this.compareTasks({
                oldTask: this.lastObservedTasks[possiblyChangedTaskId],
                newTask: tasksThatPossiblyChanged[possiblyChangedTaskId]
            });
        }        

        // Reminder differences.
        const currentReminders = fs.readdirSync(this.remindersDir);
        this.addedReminderNames = [];
        for (let currentReminder of currentReminders) {
            const isAdded = !this.lastObservedReminderNames.includes(currentReminder);
            if (isAdded) {
                this.addedReminderNames.push(currentReminder);
            }
        }

        this.deletedReminderNames = [];
        for (let oldReminder of this.lastObservedReminderNames) {
            const isDeleted = !currentReminders.includes(oldReminder);
            if (isDeleted) {
                this.deletedReminderNames.push(oldReminder);
            }
        }

        this.updateLatest();
        this.timesObserved++;        
    }

    updateLatest() {
        this.lastObservedTaskNames = fs.readdirSync(this.tasksDir);
        this.lastObservedTaskNames.forEach(taskName => {
            this.lastObservedTasks[taskName] = PlanningTask.fromJson(this.tasksDir + taskName);
        });        
        this.lastObservedReminderNames = fs.readdirSync(this.remindersDir);
    }

    /**
     * Works out the changes within a `PlanningTask` instance over time.
     * @param {PlanningTask} oldTask The task read from older version.
     * @param {PlanningTask} newTask The task read from newer version.
     * @returns {Map<string,{added:TimeFrame[],deleted:TimeFrame[]}>} Object containing changes.
     * @throws {TypeError} If the tasks do not use the same ID. 
     */
    compareTasks({ oldTask, newTask }) {
        const haveSameId = oldTask.getId() === newTask.getId();
        if (!haveSameId) {
            throw new TypeError(`The compared tasks do not carry the same IDs, IDs are ${oldTask.getId()} and ${newTask.getId()}.`);
        }
        
        const userKeys = oldTask.getUsers().map(user => user.getId());
        /** @type {Map<string,{added:TimeFrame[],deleted:TimeFrame[]}>} Object containing changes. */
        const changes = {};
        userKeys.forEach(userKey => changes[userKey] = { added: [], deleted: [] });

        for (let userKey of userKeys) {
            const oldTimeFrames = oldTask.getTimeFrames(userKey);
            const newTimeFrames = newTask.getTimeFrames(userKey);
            changes[userKey].deleted = oldTimeFrames.filter(frame => !newTimeFrames.includes(frame));
            changes[userKey].add = newTimeFrames.filter(frame => !oldTimeFrames.includes(frame));
        }

        return changes;
    }

    /**
     * Shows which reminders were newly added.
     * @returns {string[]} The file names of the added reminders.
     * @throws {NotYetObservedError} If instance could not yet observe two times.
     */
    getAddedReminders() {
        if (this.timesObserved <= 1) {
            throw new NotYetObservedError();
        }
        return this.addedReminderNames;
    }

    /**
     * Shows which reminders were deleted.
     * @returns {string[]} The file names of the deleted reminders.
     * @throws {NotYetObservedError} If instance could not yet observe two times.
     */
    getDeletedReminders() {
        if (this.timesObserved <= 1) {
            throw new NotYetObservedError();
        }
        return this.deletedReminderNames;
    }

    /**
     * Shows which tasks were newly added.
     * @returns {string[]} The file names of the added tasks.
     * @throws {NotYetObservedError} If instance could not yet observe two times.
     */
    getAddedTasks() {
        if (this.timesObserved <= 1) {
            throw new NotYetObservedError();
        }
        return this.addedTaskNames;
    }
    
    /**
     * Shows which tasks were deleted.
     * @returns {string[]} The file names of the deleted tasks.
     * @throws {NotYetObservedError} If instance could not yet observe two times.
     */
    getDeletedTasks() {
        if (this.timesObserved <= 1) {
            throw new NotYetObservedError();
        }
        return this.deletedTaskNames;
    }

    /**
     * 
     * @returns {Map<string,{added:TimeFrame[],deleted:TimeFrame[]}>} The changes made to the tasks
     */
    getTaskChanges() {
        if (this.timesObserved <= 1) {
            throw new NotYetObservedError();
        }
        return this.taskChanges;
    }
}