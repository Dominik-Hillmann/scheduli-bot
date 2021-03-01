import chai from "chai";
const expect = chai.expect;
import fs from "fs";
import { Controller } from "../src/controller/Controller.js";
import { PlanningTask } from "../src/model/PlanningTask.js";
import { FileNotFoundError } from "../src/model/FileNotFoundError.js";
import { TimeFrame } from "../src/model/TimeFrame.js";

describe("Checking for functionality of the controller class.", () => {
    const taskPath = "./data/tasks/";

    let controller;
    beforeEach(() => controller = new Controller());

    /**
     * Deletes the task with the ID `id`.
     * @param {string|number} id The ID of the task to be deleted.
     */
    let deleteTask = id => {
        fs.unlinkSync(`./data/tasks/${id}.json`);
    };

    describe("PlanningTask creation:", () => {
        it("Should create a new planning task on normal parameters.", () => {
            const userIds = [
                "123123123123",
                "312321321321",
                "111000101001"
            ];
            controller.createPlanningTask(userIds);

            let newestTask = null;
            let newestTaskDate = null;
            const taskPath = "./data/tasks/";
            fs.readdirSync(taskPath).forEach(file => {
                const fileDate = fs.statSync(taskPath + file).birthtime;
                if (newestTaskDate === null || fileDate > newestTaskDate) {
                    newestTask = taskPath + file;
                    newestTaskDate = fileDate;
                }
            });

            const readTask = PlanningTask.fromJson(newestTask);
            const readIds = readTask.members.map(user => user.getId());
            for (let userId of userIds) {
                expect(readIds).to.include(userId);
            }
            deleteTask(readTask.getId());
        });

        it("Should throw an error if there aren't at least two meeting members", () => {
            expect(() => controller.createPlanningTask(["123"])).to.throw(TypeError);
        });
    });

    describe("PlanningTask deletion:", () => {
        it("Should delete a given PlanningTask.", () => {
            const id = 999999999; 
            new PlanningTask({
                id: id,
                members: ["123", "321"]
            }).toJson();
            expect(fs.readdirSync(taskPath)).to.include(`${id}.json`);
            controller.deletePlanningTask(id);
            expect(fs.readdirSync(taskPath)).to.not.include(`${id}.json`);
        });

        it("Should throw an error if the PlanningTask does not exist.", () => {
            expect(() => controller.deletePlanningTask("101010101010101.json")).to.throw(FileNotFoundError);
        });
    });

    describe("Addition of a new time frame:", () => {
        it("Should add a new legal time frame to a planning task", () => {
            const testId = 777777777;
            const testMembers = ["987654321", "876543211", "765432111"];
            const testFrame = new TimeFrame({
                start: new Date(2020, 7, 5, 15),
                end: new Date(2020, 8, 5, 15)
            });
            const testTask = new PlanningTask({ id: testId, members: testMembers });
            testTask.toJson();
            
            controller.addTimeFrame(testMembers[1], testFrame);
            const readTask = PlanningTask.fromJson(`${taskPath}${testId}.json`);
            expect(readTask.getTimeFrames("876543211")[0]).to.eql(testFrame);
            deleteTask(testId);
        });

        it("Should throw an error if the user does not exist.", () => {
            expect(() => controller.addTimeFrame(9898827272772, new TimeFrame({
                start: new Date(2020, 7, 5, 15),
                end: new Date(2020, 8, 5, 15)
            }))).to.throw(TypeError);
        });
    });

    describe("Reminder deletion:", () => {
        it("Should delete a given reminder.");

        it("Should throw an exception if the reminder ID does not exist.");
    });
});