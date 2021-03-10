// Testing library
import chai from "chai";
const expect = chai.expect;

import fs from "fs";
import { DiscordUser } from "../src/model/DiscordUser.js";
// Tested modules
import { PlanningTask } from "../src/model/PlanningTask.js";
import { TimeFrame } from "../src/model/TimeFrame.js";

describe("Check for functionality of PlanningTask class.", () => { // describe für Gruppierungen von Tests
    const testId = 9999899;
    const extractionTestFrame = new TimeFrame({ 
        start: new Date("2021-05-05T21:21:00.000Z"), 
        end: new Date("2021-05-05T23:21:00.000Z")
    });
    const writeTask = new PlanningTask({
        id: testId,
        members: [ new DiscordUser("123"), new DiscordUser("321") ],
        timeFrames: [[ 
            extractionTestFrame,
            new TimeFrame({ 
                start: new Date("2021-05-06T21:21:00.000Z"), 
                end: new Date("2021-05-06T23:21:00.000Z") 
            })], 
            []
        ]
    });

    it("Should correctly read the test task.", () => {
        const readTask = PlanningTask.simpleFromJson("./data/tasks/test-task-1.json");
        expect(readTask).to.not.be.undefined;
        expect(readTask.id).to.equal(1);
        expect(readTask.timeFrames).to.not.be.undefined;
    });
    
    it("Should correctly convert the read JSON to a PlanningTask.", () => {
        const task = PlanningTask.fromJson("./data/tasks/test-task-1.json");
        expect(task).to.not.be.undefined;
        expect(task.getId()).to.equal(1);
        const userIds = task.getUsers().map(user => user.getId());
        for (let userId of ["6545432234325", "2312312318646"]) {
            expect(userIds).to.include(userId)
        }

        const parsedFrames = task.getTimeFrames("2312312318646");
        const firstFrame = parsedFrames[0];
        expect(parsedFrames.length).to.equal(2);
        // eql is deep equal
        expect(parsedFrames[0]).to.eql(new TimeFrame({
            start: firstFrame.start, 
            end: firstFrame.end
        }));
    });

    it("Should throw errors if there are no or fewer than two members specified", () => {
        // No parameters
        expect(() => new PlanningTask()).to.throw(TypeError);
        // One member
        expect(() => new PlanningTask({ members: ["321"] })).to.throw(TypeError);
        // Zero members
        expect(() => new PlanningTask({ members: [] })).to.throw(TypeError);
        // Two members
        expect(() => new PlanningTask({ members: ["321", "123" ] })).to.not.throw(TypeError);
    });

    it("Should choose an ID that is not in use on creation without ID.", () => {
        const allTasksNames = fs.readdirSync("./data/tasks");
        const allIds = allTasksNames.map(name => PlanningTask.fromJson(`./data/tasks/${name}`).getId());
        
        const completlyNewTask = new PlanningTask({
            members: ["6545432234325", "342342243342"]
        });
        expect(allIds).to.not.include(completlyNewTask.getId());
    });

    it("Should correctly write a JSON for itself.", () => {
        writeTask.toJson();
        const newJsonPath = `./data/tasks/${testId}.json`;
        expect(PlanningTask.fromJson(newJsonPath)).to.eql(writeTask);
        fs.unlinkSync(newJsonPath);
    });

    it("Should correctly tell you whether all users have a time frame assigned", () => {
        expect(PlanningTask.fromJson("./data/tasks/test-task-1.json").allFramesCollected()).to.equal(true);
        expect(writeTask.allFramesCollected()).to.equal(false);
    });

    it("Should give you the correct time frame of a given user.", () => {
        expect(extractionTestFrame).to.eql(writeTask.getTimeFrames("123")[0]);
    });

    it("Should be able to take up a new time frame.", () => {
        const addedTimeFrame = new TimeFrame({
            start: new Date('1990-10-03T21:21:00.000Z'),
            end: new Date('2021-02-01T23:55:00.000Z')
        });
        
        writeTask.addTimeFrame(new DiscordUser('123'), addedTimeFrame);
        expect(writeTask.getTimeFrames('123')[2]).to.eql(addedTimeFrame);
        writeTask.addTimeFrame(new DiscordUser('321'), addedTimeFrame);
        expect(writeTask.getTimeFrames('321')[0]).to.eql(addedTimeFrame);

        expect(writeTask.getTimeFrames('123').length).to.equal(3);
        expect(writeTask.getTimeFrames('321').length).to.equal(1);
    });

    it("Should be able to delete itself.", () => {
        writeTask.toJson();
        expect(fs.readdirSync("./data/tasks/")).to.include(`${testId}.json`);
        writeTask.deleteJson();
        expect(fs.readdirSync("./data/tasks/")).to.not.include(`${testId}.json`);
    });

    it("Should delete task and create reminder on completion.");
});
