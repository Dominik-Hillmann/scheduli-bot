// import { TimeFrame } from './TimeFrame.js'

/**
 * @class Calculates overlapping time frames.
 */
export class Scheduler {
    
    /**
     * 
     * @param {Map<string, import('./TimeFrame').TimeFrame[]>} userSchedules 
     * @param {number} minSecsInCommon
     * @throws {TypeError} If there are schedules for only one 
     * user.
     */
    constructor(userSchedules, minSecsInCommon = -1) {
        // für jede Kombination von Zeiträumen
        // Zeichne auf, wieviele Zeiträume überlappen
        // 

        const userIds = Object.keys(userSchedules);
        if (userIds.length <= 1) {
            throw new TypeError(`Need more than one user to schedule. Got ${userIds.length}.`);
        }

        // let maxIndex = 

        // for (let i = 1; i < userIds.length; i++) {

        // }
    }




    /**
     * @returns {number} The number of common frames found.
     */
    getNumCommonFrames() {

    }
}