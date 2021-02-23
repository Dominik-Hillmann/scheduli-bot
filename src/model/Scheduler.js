// import { TimeFrame } from './TimeFrame.js'

/**
 * @class Calculates overlapping time frames.
 */
export class Scheduler {
    
    /**
     * 
     * @param {Map<string, import('./TimeFrame').TimeFrame[]>} userSchedules 
     * @param {number} minSecsInCommon Minimum amount of seconds of the overlap
     * @throws {TypeError} If there are schedules for only one 
     * user.
     */
    constructor(userSchedules, minSecsInCommon = 0) {
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
        const firstKey = keys.pop(0);
        this.intersectedFrame = userSchedules[firstKey];
        for (let key of keys) {
            const otherFrame = userSchedules[key];
            if (!this.intersectedFrame.intersectsWith(otherFrame)) {
                this.intersectedFrame = null;
                break;
            }
            
            this.intersectedFrame = this.intersectedFrame.intersect(otherFrame);
            const intersectLargeEnough = this.intersectedFrame.getFrameLength() > minSecsInCommon;
            if (!intersectLargeEnough) {
                this.intersectedFrame = null;
                break;
            } 
        }
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