/**
 * @class Collects the timeout IDs. This needs to be done here because the ID
 * cannot be made persistent.
 * This class basically exists to connect all timeout IDs to reminder IDs.
 */
export class PendingMessages {
    /**
     * The constructor.
     */
    constructor() {
        this.timeouts = {};
    }
    
    /**
     * Adds a new timeout ID.
     * @param {string|number} id The `Reminder` ID.
     * @param {"ID returned by setTimeout"} timeoutId The ID of the time, returned by `setTimeout`.
     */
    add(id, timeoutId) {
        this.timeouts[id] = timeoutId;
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
     * @returns {string[]} The IDs of the registered reminders.
     */
    getReminderIds() {
        return Object.keys(this.timeouts);
    }
}