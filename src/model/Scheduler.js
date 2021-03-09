/**
 * @class Calculates overlapping time frames.
 */
export class Scheduler {    
    /**
     * Constructor the the scheduler.
     * @param {Map<string, import('./TimeFrame').TimeFrame[]>} userSchedules 
     * @param {number} minSecsInCommon Minimum amount of seconds of the overlap
     * @throws {TypeError} If there are schedules for only one user.
     */
    constructor(userSchedules, minSecsInCommon = 0) {
        // für jede Kombination von Zeiträumen
        // Zeichne auf, wieviele Zeiträume überlappen
        // 

        const userIds = Object.keys(userSchedules);
        if (userIds.length <= 1) {
            throw new TypeError(`Need more than one user to schedule. Got ${userIds.length}.`);
        }
        
        this.intersectedFrame = this.determineCommonTimeFrame(userSchedules, minSecsInCommon);        
    }

    /**
     * Determines the common time frame of all users.
     * @param {Map<string, import('./TimeFrame').TimeFrame[]>} userSchedules The schedules
     * of each user.
     * @param {number} minSecsInCommon The minimum length of the time frame in seconds.
     * @returns {import('./TimeFrame').TimeFrame|null} The time frame every user has
     * in common.
     */
    determineCommonTimeFrame(userSchedules, minSecsInCommon) {
        const keys = Object.keys(userSchedules);
        const firstKey = keys.pop(0);
        let intersectedFrame = userSchedules[firstKey];
        for (let key of keys) {
            const otherFrame = userSchedules[key];
            if (!intersectedFrame.intersectsWith(otherFrame)) {
                return null; // No common frame found.
            }
            
            intersectedFrame = intersectedFrame.intersect(otherFrame);
            const intersectLargeEnough = intersectedFrame.getFrameLength() > minSecsInCommon;
            if (!intersectLargeEnough) {
                return null; // No common frame found.
            } 
        }

        return intersectedFrame;
    }


    /**
     * Get the intersection of all input time frames.
     * @returns {import('./TimeFrame').TimeFrame|null} The intersection of all time frames.
     * Is `null`, if there is no common overlap.
     */
    getOverlap() {
        return this.intersectedFrame;
    }
}