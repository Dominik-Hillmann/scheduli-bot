/**
 * @class The error if a difference of files fron `Observer` is wanted, but the 
 * `Observer` did not yet observe the files.
 */
 export class NotYetObservedError extends Error {
    /**
     * The constructor.
     */
    constructor() {
        super("The observer must observer the files in the data directory at least two times.");
    }
}