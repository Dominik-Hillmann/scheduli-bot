import { GuildMember } from "discord.js";

export class DiscordUser {
    /**
     * 
     * @param {string} id 
     */
    constructor(id) {
        this.id = id;
    }


    getId() {
        return this.id;
    }

    getMention() {
        return `<@${this.id}>`;
    }
}