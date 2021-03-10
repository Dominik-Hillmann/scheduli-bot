// Testing library
import chai from "chai";
import { DiscordUser } from "../src/model/DiscordUser.js";
const expect = chai.expect;
// Tested modules
import { PlanningTask } from "../src/model/PlanningTask.js";
import { TimeFrame } from "../src/model/TimeFrame.js";
import { NotYetObservedError } from "../src/view/NotYetObservedError.js";
import { Observer } from "../src/view/Observer.js";

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

describe("Check the Observer class.", () => {
    let observer;
    beforeEach(() => observer = new Observer());

    it("Should instantiate correctly.", () => {
        const testObserver = new Observer();
        expect(testObserver).to.not.be.undefined;
        expect(testObserver).to.not.be.null;
    });

    it("Should throw errors if there is no previous observation of files on wanted differences.", () => {
        expect(() => observer.getAddedReminders()).to.throw(NotYetObservedError);
        expect(() => observer.getAddedTasks()).to.throw(NotYetObservedError);
        expect(() => observer.getDeletedReminders()).to.throw(NotYetObservedError);
        expect(() => observer.getDeletedTasks()).to.throw(NotYetObservedError);
        expect(() => observer.getTaskChanges()).to.throw(NotYetObservedError);

        observer.observe();
        expect(() => observer.getAddedReminders()).to.throw(NotYetObservedError);
        expect(() => observer.getAddedTasks()).to.throw(NotYetObservedError);
        expect(() => observer.getDeletedReminders()).to.throw(NotYetObservedError);
        expect(() => observer.getDeletedTasks()).to.throw(NotYetObservedError);
        expect(() => observer.getTaskChanges()).to.throw(NotYetObservedError);

        observer.observe();
    });

    it("Should show added tasks.");

    it("Should show added reminders.");
    it("Should show deleted tasks.");
    it("Should show deleted reminders.");
    it("Should see when a time frame was added.");
    it("Should see when a time frame was deleted.");
    it("Should see when a time frame was added and deleted.");
    it("Should register nothing if nothing happened.");
});