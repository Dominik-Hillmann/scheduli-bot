import { 
    MessageMentions, 
    GuildMember
} from "discord.js";
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


    toJson() {

    }

    static fromJson() {

    }

    getUsedIds() {
        let ids = [];
        fs.readdirSync(".").forEach(file => {
            console.log(file);
        });
    }

}
