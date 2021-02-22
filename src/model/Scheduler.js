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
        
        // Erstmal nur die Version implementieren, die eine Überlappung in allen frames haben 
        // möchte.
        const keys = Object.keys(userSchedules);
        for (let key1 of keys) {
            for (let key2 of keys) {
                if (key1 == key2) {
                    continue;
                }

                const frame1 = userSchedules.get(key1);
                const frame2 = userSchedules.get(key2);
                if (frame1.intersectsWith(frame2)) {

                } else {

                }
            }
        }
    }



    /**
     * @returns {number} The number of common frames found.
     */
    getNumCommonFrames() {

    }
}