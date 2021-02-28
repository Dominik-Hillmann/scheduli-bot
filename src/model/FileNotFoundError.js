/**
 * @class The error if a file name wasn't found.
 */
export class FileNotFoundError extends Error {
    /**
     * The constructor.
     * @param {string} path The path to the file that was wanted.
     */
    constructor(path) {
        super(`Unable to find "${path}."`);
    }
}