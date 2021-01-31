// Testing library
import chai from "chai";
const expect = chai.expect;

import fs, { write } from "fs";
import { DiscordUser } from "../src/model/DiscordUser.js";
// Tested modules
import { PlanningTask } from "../src/model/PlanningTask.js"
import { TimeFrame } from "../src/model/TimeFrame.js";

describe("Check for functionality of PlanningTask class.", () => { // describe für Gruppierungen von Tests
    const testId = 9999999;
    const writeTask = new PlanningTask({
        id: testId,
        members: [ new DiscordUser("123"), new DiscordUser("321") ],
        timeFrames: [[ 
                new TimeFrame({ start: new Date("2021-05-05T21:21:00.000Z"), end: new Date("2021-05-05T23:21:00.000Z") }),
                new TimeFrame({ start: new Date("2021-05-06T21:21:00.000Z"), end: new Date("2021-05-06T23:21:00.000Z") })
            ], []
        ]
    });

    it("Should correctly read the test task.", () => {
        const readTask = PlanningTask.simpleFromJson("./data/tasks/test-task.json");
        expect(readTask).to.not.be.undefined;
        expect(readTask.id).to.equal(1);
        expect(readTask.timeFrames).to.not.be.undefined;
    });
    
    it("Should correctly convert the read JSON to a PlanningTask.", () => {
        const task = PlanningTask.fromJson("./data/tasks/test-task.json");
        expect(task).to.not.be.undefined;
        expect(task).to.be.a("PlanningTask");
        expect(task.getId()).to.equal(1);

        const userIds = task.getUsers().map(user => user.getId());
        for (let userId of ["6545432234325", "2312312318646"]) {
            expect(userIds).to.include(userId)
        }

        const parsedFrames = task.getTimeFrames("6545432234325");
        const firstFrame = parsedFrames[0];
        expect(parsedFrames.length).to.equal(2);
        // eql is deep equal
        expect(parsedFrames[0]).to.eql(new TimeFrame({
            start: firstFrame.start, 
            end: firstFrame.end
        }));
    });

    it("Should choose an ID that is not in use on creation without ID.", () => {
        const allTasksNames = fs.readdirSync("../data/tasks");
        const allIds = allTasksNames.map(name => PlanningTask.fromJson(`../data/tasks/${name}`).getId());
        expect(allIds).to.not.include(new PlanningTask({
            members: ["6545432234325"]
        }).getId());
    });

    it("Should correctly write a JSON for itself.", () => {
        writeTask.toJson();
        expect(PlanningTask.fromJson(`../data/tasks/${testId}.json`)).to.eql(writeTask);
        fs.unlinkSync(`../data/tasks/${testId}.json`);
    });

    it("Should correctly tell you whether all users have a time frame assigned", () => {
        expect(PlanningTask.fromJson("../data/tasks/test-task.json").allFramesCollected()).to.equal(true);
        expect(writeTask.allFramesCollected()).to.equal(false);
    });

    it("Should give you the correct time frame of a given user.", () => {
        writeTask.getTimeFrames("123")[0]
    });
});
