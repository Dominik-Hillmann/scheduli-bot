// Testing library
import chai from "chai";
const expect = chai.expect;

import fs from "fs";
// Tested modules
import { PlanningTask } from "../src/model/PlanningTask.js"

describe("Check for functionality of PlanningTask class.", () => { // describe für Gruppierungen von Tests
    it("Should correctly read the test task.", () => {
        const readTask = PlanningTask.simpleFromJson("./data/tasks/test-task.json");
        expect(readTask).to.not.be.undefined;
        expect(readTask.id).to.equal(1);
        expect(readTask.timeFrames).to.not.be.undefined;
    });
    
    it("Should correctly convert the read JSON to a PlanningTask.", () => {
        // const task = PlanningTask.fromJson("./data/tasks/test-task.json");
        // expect(task).to.not.be.undefined;
        // expect(task).to.be.a("PlanningTask");
        // expect(task.getId()).to.equal(1);
    });

    it("Should choose an ID that is not in use on creation without ID.", () => {

    });
});
//     it("should return true", () => {
//         //Testing a boolean
//         expect(true).toBeTruthy();
//         //Another way to test a boolean
//         expect(true).toEqual(1 === 1);
//     });

//     it("should be falsy", () => {
//         expect(false).toBeFalsy();
//     });
// });

// describe("ein weiterer Test", () => {
//     it("ist ein Test, lol", () => {
//         expect(1 === 1).toEqual(1 === 1);
//     });
// });