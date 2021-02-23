/**
 * @class Represents a time window.
 */
export class TimeFrame {    
    /**
     * Constructor using the start date and end date as `Date` or UNIX time stamp.
     * @param {{start:Date|number,end:Date|number}} data 
     */
    constructor({ start, end }) {
        const startType = typeof start;
        const endType = typeof end;

        const startDate = startType === 'number' ? new Date(start * 1000) : start;
        const endDate = endType === 'number' ? new Date(end * 1000) : end;

        const startIsDate = startDate instanceof Date;
        const endIsDate = endDate instanceof Date;
        if (!startIsDate || !endIsDate) {
            throw new TypeError(`Start date is or end date is not a date.`);
        }

        if (endDate < startDate) {
            throw new TypeError('The end date comes before the start date.');
        }

        this.start = startDate;
        this.end = endDate;
    }

    /**
     * Get the UNIX time stamp of the start.
     * @returns {number} The UNIX time stamp.
     */
    getStartUnix() {
        return parseInt((this.start.getTime() / 1000).toFixed(0));
    }

    /**
     * Get the UNIX time stamp of the end.
     * @returns {number} The UNIX time stamp.
     */
    getEndUnix() {
        return parseInt((this.end.getTime() / 1000).toFixed(0));
    }

    /**
     * Get the start date.
     * @returns {Date} The start.
     */
    getStart() {
        return this.start;
    }

    /**
     * Get the end date.
     * @returns {Date} The end.
     */
    getEnd() {
        return this.end;
    }

    /**
     * Get the time frame in seconds.
     * @returns {number} The size of the time frame in seconds.
     */
    getFrameLength() {
        return Math.round((this.end - this.start) / 1000);
    }

    /**
     * Tests whether this frame intersects with another frame.
     * @param {TimeFrame} otherFrame The frame with which this frame possibly intersects.
     * @returns {boolean} Whether they intersect with each other.
     */
    intersectsWith(otherFrame) {
        return this.start <= otherFrame.end && otherFrame.start <= this.end;
    }

    /**
     * Get the intersection between this `TimeFrame` and another `TimeFrame`.
     * @param {TimeFrame} otherFrame The time frame with which to intersect.
     * @returns {TimeFrame|null} The intersection.
     */
    intersect(otherFrame) {
        if (!this.intersectsWith(otherFrame)) {
            return null;
        }

        return new TimeFrame({
            start: this.getStart() >= otherFrame.getStart() ? this.getStart() : otherFrame.getStart(),
            end: this.getEnd() <= otherFrame.getEnd() ? this.getEnd() : otherFrame.getEnd()
        });
    }

    /**
     * Object that can easily be written to JSON.
     * @returns {{start:number,end:number}} Returns version that can easily be
     * written to JSON.
     */
    toJsonFriendly() {
        return {
            start: this.getStartUnix(),
            end: this.getEndUnix()
        };
    }
}