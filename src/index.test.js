// This file contains all integrations tests that are concerned with


describe("forgotPassword()", () => { // describe für Gruppierungen von Tests
    it("should return true", () => {
        //Testing a boolean
        expect(true).toBeTruthy();
        //Another way to test a boolean
        expect(true).toEqual(1 === 1);
    });

    it("should be falsy", () => {
        expect(false).toBeFalsy();
    });
});

describe("ein weiterer Test", () => {
    it("ist ein Test, lol", () => {
        expect(1 === 1).toEqual(1 === 1);
    });
});