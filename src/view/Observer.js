import fs from "fs";
import { PlanningTask } from "../model/PlanningTask";

/**
 * @class After a certain is action of the `controller` is finished,
 * the `Observer` takes a look at the persistent files and determines
 * what has changed.
 */
export class Observer {
    constructor() {
        this.latestReminderNames = undefined;
        this.latestTaskNames = undefined;
        this.latestTasks = [];
        this.previouslyObserved = false;

        this.remindersDir = "./data/reminders/";
        this.tasksDir = "./data/tasks/";
    }

    observe() {
        if (!this.previouslyObserved) {
            this.latestTasksNames = fs.readdirSync(this.tasksDir);
            this.latestTasksNames.forEach(taskName => {
                this.latestTasks[taskName] = PlanningTask.fromJson(this.tasksDir + taskName);
            });
            
            this.latestReminderNames = fs.readdirSync(this.remindersDir);

        } else {
            
        }

        // ...
        this.previouslyObserved = true;        
    }

    /**
     * 
     * @returns {{newTasks:string[],changedTasks:string[],newReminders:string[]}}
     */
    getDifferenceTaskFiles() {

    }


    getDifferenceTasks() {

    }

    getDifferenceReminderFiles() {
        
    }
}