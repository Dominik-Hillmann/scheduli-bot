/**
 * @class Interacts with the model on behalf of what happens in the view.
 */
export class Controller {
    /**
     * Creates a new task to look for a common time frame of the given members.
     * @param {string[]} members The IDs of the meeting members. 
     */
    createPlanningTask(members) {
        
    }

    /**
     * Deletes the persistent `PlanningTask` that uses the ID `id`.
     * @param {number} id The task ID.
     */
    deletePlanningTask(id) {

    }

    /**
     * Adds a possible time frame at which a user is available for a meeting.
     * @param {import('../model/TimeFrame.js').TimeFrame} timeFrame The time frame
     * the user wants to add. 
     */
    addTimeFrame(timeFrame) {

    }

    /**
     * Deletes a peristent reminder for a meeting.
     * @param {number} id The reminder ID.
     */
    deleteReminder(id) {

    }
}