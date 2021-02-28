import { DiscordUser } from "./DiscordUser";

/**
 * @class The scheduled meeting that will remind participants.
 */
export class Reminder {    
    /**
     * The reminder's constructor.
     * @param {{members:DiscordUser[]|string[]|number[],time:Date|number}} reminderData
     * The members of the scheduled meeting and the start of it.
     */
    constructor({ members, time }) {
        if (members === undefined || time === undefined) {
            throw new TypeError("Both members and time need to be specified.");
        }

        this.members = [];
        members.forEach(member => {
            this.members.push(member instanceof DiscordUser ? member : new DiscordUser(member));
        });

        this.time = time instanceof Date ? time : new Date(time);
    }

    schedule() {

    }
}