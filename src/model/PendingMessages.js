/**
 * @class Collects the timeout IDs. This needs to be done here because the ID
 * cannot be made persistent.
 * This class basically exists to connect all timeout IDs to reminder IDs.
 */
export class PendingMessages {
    /**
     * The constructor.
     * @param {import("discord.js").Client} client The discord client. 
     */
    constructor(client) {
        this.client = client;
        this.timeouts = {};
    }
    
    /**
     * Adds a new timeout ID.
     * @param {import('./Reminder.js').Reminder} reminder The reminder.
     */
    add(reminder) {
        this.timeouts[reminder.getId()] = reminder.schedule(this.client);
    }

    /**
     * Destroys the timeout of the `Reminder` with ID `id`.
     * @param {number} id The ID.
     */
    destroy(id) {
        const availableIds = this.getReminderIds();
        id = typeof id === "string" ? parseInt(id) : id;
        if (!availableIds.includes(id)) {
            throw new TypeError(`Did not find ID ${id}. Available are ${availableIds.join(", ")}.`);
        }
        clearTimeout(this.get(id));
        delete this.timeouts[id];
    }

    /**
     * Get the timeout ID belonging to this reminder.
     * @param {string|number} id The reminder ID.
     * @return {"ID returned by setTimeout"} The timeout ID.
     */
    get(id) {
        return this.timeouts[id];
    }

    /**
     * Get all the IDs of the reminders that are registered.
     * @returns {number[]} The IDs of the registered reminders.
     */
    getReminderIds() {
        return Object.keys(this.timeouts).map(id => parseInt(id));
    }

    /**
     * Destroys all reminders.
     */
    destroyAll() {
        Object.keys(this.timeouts).forEach(id => this.destroy(id));
    }
}