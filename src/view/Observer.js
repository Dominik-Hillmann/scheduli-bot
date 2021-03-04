import fs from "fs";

/**
 * @class After a certain is action of the `controller` is finished,
 * the `Observer` takes a look at the persistent files and determines
 * what has changed.
 */
export class Observer {
    constructor() {
        this.latestReminders = {};
        this.latestTasks = {};
        this.previouslyObserved = false;

        this.remindersDir = "./data/reminders/";
        this.tasksDir = "./data/tasks/";
    }

    observe() {
        if (!this.previouslyObserved) {
            
        }

        // ...
        this.previouslyObserved = true;        
    }

    /**
     * 
     * @returns {{newTasks:string[],changedTasks:string[],newReminders:string[]}}
     */
    getDifference() {

    }
}