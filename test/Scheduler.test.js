// Testing library
import chai from "chai";
const expect = chai.expect;
// Tested modules
import { Scheduler } from "../src/model/Scheduler.js";
import { TimeFrame } from "../src/model/TimeFrame.js";

describe('Checks for correctness of the Scheduler class.', () => {
    const frameA = new TimeFrame({ start: 1, end: 3 });
    const frameB = new TimeFrame({ start: 2, end: 5 });
    const frameC = new TimeFrame({ start: 4, end: 8 });
    const frameD = new TimeFrame({ start: 6, end: 7 });
    const frameE = new TimeFrame({ start: 7, end: 10 });
    const frameF = new TimeFrame({ start: 2, end: 4 });

    it('Should be correctly instanciated', () => {
        const scheduler = new Scheduler({ '123': frameA, '321': frameC });
        expect(scheduler).to.not.be.undefined;
        expect(scheduler).to.not.be.empty;
    });

    it('Should not find any overlaps in not overlapping frames.', () => {
        const scheduler = new Scheduler({
            '123': frameA,
            '321': frameE
        });
        expect(scheduler.getOverlap()).to.be.null;
    });

    it('Should find an overlap in two overlapping frames.', () => {        
        const scheduler = new Scheduler({ 
            '123': frameA, 
            '321': frameB 
        });
        expect(scheduler.getOverlap()).to.eql(new TimeFrame({
            start: 2,
            end: 3
        }));
    });

    it('Should find the overlap of a frame within a frame.', () => {
        const scheduler = new Scheduler({ 
            '123': frameC, 
            '321': frameD 
        });
        expect(scheduler.getOverlap()).to.eql(frameD);
    });

    it('Should find overlap of three ranges.', () => {
        const scheduler = new Scheduler({
            '123': frameA,
            '234': frameB,
            '345': frameF
        });
        expect(scheduler.getOverlap()).to.not.be.null;
        expect(scheduler.getOverlap()).to.eql(new TimeFrame({
            start: 2, 
            end: 3
        }));
    });

    it("Should not find an overlap, if it is not large enough.", () => {
        const scheduler = new Scheduler({
            '123': frameA,
            '234': frameB,
            '345': frameF
        }, 3);
        expect(scheduler.getOverlap()).to.be.null;
    });
});
