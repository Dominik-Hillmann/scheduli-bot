export class DiscordUser {
    /** The Discord ID of the user. */
    id;
    /** The server the user uses. */
    serverName;

    /**
     * Create a new Discord user.
     * @param {string} id The user's ID.
     * @param {string} serverName The server the user uses.
     */
    constructor(id, serverName) {
        this.id = id;
    }

    /**
     * Get the ID of the user.
     * @returns {string} The Discord user ID.
     */
    getId() {
        return this.id;
    }

    /**
     * Get a user mention ready to be embedded into a message.
     * @returns {string} The mention.
     */
    getMention() {
        return `<@${this.id}>`;
    }
}