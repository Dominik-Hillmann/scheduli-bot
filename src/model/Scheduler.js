import { TimeFrame } from './TimeFrame.js'

/**
 * @class Calculates overlapping time frames.
 */
export class Scheduler {
    
    /**
     * 
     * @param {Map<string, TimeFrame[]>} userSchedules 
     * @param {number} minSecsInCommon
     */
    constructor(userSchedules, minSecsInCommon = -1) {
        // für jede Kombination von Zeiträumen
        // Zeichne auf, wieviele Zeiträume überlappen
        this.test = userSchedules;

    }




    /**
     * @returns {number} The number of common frames found.
     */
    getNumCommonFrames() {

    }
}