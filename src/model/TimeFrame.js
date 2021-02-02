export class TimeFrame {
    
    /**
     * 
     * @param {{start:Date|number, end:Date|number}} data 
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

        if (endDate <= startDate) {
            throw new TypeError('The end date comes before the start date.');
        }

        this.start = startDate;
        this.end = endDate;
    }

    getStartUnix() {
        return parseInt((this.start.getTime() / 1000).toFixed(0));
    }

    getEndUnix() {
        return parseInt((this.end.getTime() / 1000).toFixed(0));
    }

    getStart() {
        return this.start;
    }

    getEnd() {
        return this.end;
    }

    toJsonFriendly() {
        return {
            start: this.getStartUnix(),
            end: this.getEndUnix()
        };
    }
}