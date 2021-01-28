// Testing library
import chai from "chai";
const expect = chai.expect;

import { PlanningTask } from "../src/model/PlanningTask.js"

describe("Check for functionality of PlanningTask class.", () => { // describe für Gruppierungen von Tests
    it("Should correctly read the test task", () => {
        const readTask = PlanningTask.fromJson("./data/tasks/test-task.json");

        expect(readTask).to.not.be.undefined;
        expect(readTask.id).to.equal(1);
        
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