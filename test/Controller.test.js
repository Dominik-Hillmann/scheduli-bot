import chai from "chai";
const expect = chai.expect;
import fs from "fs";
import { Controller } from "../src/controller/Controller.js";

describe("Checking for functionality of the controller class.", () => {
    let controller;
    beforeEach(() => controller = new Controller());

    // Create test task
    // before("Create test task.");
    // Delete test task
    // after("Delete test task.");

    describe("PlanningTask creation:", () => {
        it("Should create a new planning task on normal parameters.", () => {
            console.log(fs.readdirSync("./data/tasks/"));
            const userIds = [
                "123123123123",
                "312321321321",
                "111000101001"
            ];
            controller.createPlanningTask(userIds);

            fs.readdir("./data/tasks/", (err, list) => {
                list.forEach(file => console.log(file, fs.statSync("./data/tasks/" + file).birthtime));
            });
        });

        it("Should throw an error if there aren't at least two meeting members");
    });

    describe("PlanningTask deletion:", () => {
        it("Should delete a given PlanningTask.");

        it("Should throw an error if the PlanningTask does not exist.");
    });

    describe("Addition of a new time frame:", () => {
        it("Should add a new legal time frame to a planning task");
    });

    describe("Reminder deletion:", () => {
        it("Should delete a given reminder.");

        it("Should throw an exception if the reminder ID does not exist.");
    });
});