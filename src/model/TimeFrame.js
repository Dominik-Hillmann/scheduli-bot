export class TimeFrame {
    
    /**
     * 
     * @param {{start: number|Date, end: number|Date}} data 
     */
    constructor(data) {
        const startType = typeof data.start;
        const endType = typeof data.end;

        if (startType === 'number' && endType === 'number') {
            this.start = new Date(data.start * 1000);
            this.end = new Date(data.end * 1000);
        } else if (data.start instanceof Date && data.end instanceof Date) {
            this.start = data.start;
            this.end = data.end;
        } else {
            throw new TypeError('Both start and need to be numbers or Dates');
        }
    }

    getStartUnix() {
        return parseInt((this.start.getTime() / 1000).toFixed(0));
    }

    getEndUnix() {
        return parseInt((this.end.getTime() / 1000).toFixed(0));
    }

    toJsonFriendly() {
        return {
            start: this.getStartUnix(),
            end: this.getEndUnix()
        };
    }
}