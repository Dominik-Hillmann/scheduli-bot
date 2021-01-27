import { Message } from "discord.js";
// const Message = require("discord.js").Message;
// import { PlanningTask } from "../model/PlanningTask";
import { PlanningTask } from "../model/PlanningTask.js";

/**
 * Interacts with the model on behalf of what happens in the view.
 */
export class Controller {
    constructor() { }


    detectMessageType() {

    }

    /**
     * 
     * @param {Message} msg The message from which to create the plan.
     * @throws
     */
    createPlanningTask(msg) {
        let wantedMemberIds = msg.mentions.members.keys();
        console.log(wantedMemberIds);
        let task = new PlanningTask(wantedMemberIds);
    }


}