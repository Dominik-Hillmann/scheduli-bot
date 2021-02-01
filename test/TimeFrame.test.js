// Testing library
import chai from "chai";
const expect = chai.expect;
// Tested modules
import { TimeFrame } from "../src/model/TimeFrame.js";

describe("Check for functionality of the TimeFrame class.", () => {
    const start = new Date("2021-12-17T13:24:00");
    const end = new Date("2021-12-17T16:35:00");

    // it("Should be instantiated when start comes before the end.", () => {
    //     const frame = new TimeFrame(start, end);
    //     expect(frame).to.not.be.undefined;
    //     expect(frame).to.not.be.empty;
    // });

    // it("Should throw TypeError if start is later than end.", () => {
    //     expect(() => new TimeFrame(end, start)).to.throw(TypeError);
    // });

    // it("Should return the correct start and end dates as date objects.", () => {
    //     const frame = new TimeFrame(start, end);
    //     expect(frame.getStart()).to.equal(start);
    //     expect(frame.getEnd()).to.equal(end);
    // });

    // it("Should be the same if made from UNIX timestamps as if made of date objects.", () => {
    //     const startStamp = parseInt((start.getTime() / 1000).toFixed(0));
    //     const endStamp = parseInt((end.getTime() / 1000).toFixed(0));

    //     expect(new TimeFrame(start, end)).to.equal(new TimeFrame(startStamp, endStamp));
    // });

    // it("Should be parsed to JSON in the correct way.", () => {
    //     const frame = new TimeFrame(start, end);
    //     const simpleJsonObject = {
    //         start: parseInt((start.getTime() / 1000).toFixed(0)),
    //         end: parseInt((end.getTime() / 1000).toFixed(0))
    //     };
    //     expect(frame.toJsonObject()).to.equal(simpleJsonObject);
    // });

    // it("Should be correctly parsed a simple object made for/from JSON", () => {
    //     const simpleJsonObject = {
    //         start: parseInt((start.getTime() / 1000).toFixed(0)),
    //         end: parseInt((end.getTime() / 1000).toFixed(0))
    //     };
    //     const frame = new TimeFrame(start, end);
    //     expect(TimeFrame.fromJsonObject(simpleJsonObject)).to.equal(frame);
    // });
});