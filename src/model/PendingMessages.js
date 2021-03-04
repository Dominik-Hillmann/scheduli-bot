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
     * @param {import('./Reminder.js').Reminder} reminder The reminder.
     */
    add(reminder) {
        this.timeouts[reminder.getId()] = reminder.schedule();
    }

    destroy(id) {
        const availableIds = this.getReminderIds(); 
        if (!availableIds.includes(id)) {
            throw new TypeError(`Did not find ID ${id}. Available are ${availableIds.join(", ")}.`);
        }

        clearTimeout(this.get(id));
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
}