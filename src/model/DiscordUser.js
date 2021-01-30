import { GuildMember } from "discord.js";

export class DiscordUser {
    /** The Discord ID of the user. */
    id;

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