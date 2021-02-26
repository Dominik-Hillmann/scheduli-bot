import chai from "chai";
import { MessageEmbed } from "discord.js";
// import { Test } from "mocha";
import { Controller } from "../src/controller/Controller.js";
import { TimeFrame } from "../src/model/TimeFrame.js";
import { CommandInterpreter } from "../src/view/CommandInterpreter.js";
const expect = chai.expect;

/**
 * @class A controller that makes the command interpreter testable.
 */
class TestController extends Controller {
    constructor() {
        super();
        this.calledCreatePlanningTask = false;
        this.calledDeletePlanningTask = false;
        this.calledAddTimeFrame = false;
        this.calledDeleteReminder = false;        
    }

    createPlanningTask(members) {
        this.calledCreatePlanningTask = true;
        this.members = members;
    }

    deletePlanningTask(id) {
        this.calledDeletePlanningTask = true;
        this.id = id;
    }

    addTimeFrame(userId, timeFrame) {
        this.calledAddTimeFrame = true;
        this.userId = userId;
        this.timeFrame = timeFrame;
    }

    deleteReminder(id) {
        this.calledDeleteReminder = true;
        this.id = id;
    }
}

/**
 * @class Simulates a Discord message without having to create a new client.
 * It has all the relevant methods and attributes of a Discord message.
 */
class TestMessage {
    constructor(content, membersWanted = true) {
        this.content = content;
        let members = !membersWanted ? {} : {
            "123": null,
            "321": null,
            "159": null
        };
        this.mentions = { members: members };
        this.author = { id: "123" };
    }
}

describe("Correct functionality of the CommandInterpreter class.", () => {
    const prefix = "!scheduli";
    let handler;
    // Reset the handler after each test.
    beforeEach(() => handler = new CommandInterpreter(new TestController()));

    describe("Checks for messages that are not commands.", () => {
        it("Should throw an error if message does not contain the correct prefix", () => {
            const msg = new TestMessage("Das ist ein Test.");    
            expect(() => handler.handle(msg)).to.throw(TypeError);
        });
    
        it("Should throw an error if the message is empty, null, undefined.", () => {
            const emptyMsg = new TestMessage("");
            const nullMsg = new TestMessage(null);
            const undefinedMsg = new TestMessage(undefined);    
            expect(() => handler.handle(emptyMsg)).to.throw(TypeError);
            expect(() => handler.handle(nullMsg)).to.throw(TypeError);
            expect(() => handler.handle(undefinedMsg)).to.throw(TypeError);
        });
    
        it("Should throw an error if the wanted command does not exist.", () => {
            const testMsg = new TestMessage("!scheduli bla bla adsdsadsa");    
            expect(() => handler.handle(testMsg)).to.throw(TypeError);
        });
    });

    describe("Checks for commands accessing the controller.", () => {
        it("Should handle PlanningTask creation.", () => {
            const testMsg = new TestMessage(prefix + " schedule @dom1024inik @charlie");
            handler.handle(testMsg);
            expect(handler.controller.calledCreatePlanningTask).to.be.true;
            for (let member of handler.controller.members) {
                expect(member).to.be.a("string");
            }
        });

        it("Should throw an error if there are no arguments to a PlanningTask creation", () => {
            const testMsg = new TestMessage(prefix + " schedule", false);
            expect(() => handler.handle(testMsg)).to.throw(TypeError);
        });

        it("Should handle PlanningTask deletion.", () => {
            const testMsg = new TestMessage(prefix + " del task 1");
            handler.handle(testMsg);
            expect(handler.controller.calledDeletePlanningTask).to.be.true;
            expect(handler.controller.id).to.equal(1);
        });

        it("Should throw an error if there are no arguments to a deletion.", () => {
            const testMsg = new TestMessage(prefix + " del task");
            expect(() => handler.handle(testMsg)).to.throw(TypeError);
        });

        it("Should handle an additional TimeFrame from a user.", () => {
            const testMsg = new TestMessage(prefix + " add from Jul 4th 2020 3pm to Aug 5th 2020 1am");
            handler.handle(testMsg);
            expect(handler.controller.calledAddTimeFrame).to.be.true;
            expect(handler.controller.timeFrame).to.eql(new TimeFrame({
                start: new Date(2020, 6, 4, 15, 0),
                end: new Date(2020, 7, 5, 1, 0)
            }));
            expect(handler.controller.userId).to.equal(testMsg.author.id);
        });

        it("Should throw an error if there are no arguments to a TimeFrame addition.", () => {
            const testMsg = new TestMessage(prefix + " add");
            expect(() => handler.handle(testMsg)).to.throw(TypeError);
        });

        it("Should handle a Reminder deletion.", () => {
            const testMsg = new TestMessage(prefix + " del reminder 2");
            handler.handle(testMsg);
            expect(handler.controller.calledDeleteReminder).to.be.true;
            expect(handler.controller.id).to.equal(2);
        });

        it("Should throw an error if there are no arguments to a reminder deletion.", () => {
            const testMsg = new TestMessage(prefix + " del reminder");
            expect(() => handler.handle(testMsg)).to.throw(TypeError);
        });
    });

    describe("Checks for commands that do not access the controller.", () => {
        it("Should give information about available commands.", () => {
            const testMsg = new TestMessage(prefix + " list commands");
            const testMsgWithSpace = new TestMessage("   " + testMsg.content + "   ");
            const testMsgWithGibberish = new TestMessage(testMsg.content + "sads dsadsa");
            
            expect(handler.handle(testMsg)).to.be.instanceOf(MessageEmbed);
            expect(handler.handle(testMsgWithSpace)).to.be.instanceOf(MessageEmbed);
            expect(() => handler.handle(testMsgWithGibberish)).to.throw(TypeError);
        });

        // Wird mit der Implementierung von des Reminders genutzt.
        it("Should give information about currently pending reminders.");
        /*it("Should give information about currently pending reminders.", () => {
            const testMsg = new TestMessage(prefix + " list reminders");
            const testMsgWithSpace = new TestMessage("   " + testMsg.content + "   ");
            const testMsgWithGibberish = new TestMessage(testMsg.content + "sads dsadsa");
            
            expect(handler.handle(testMsg)).to.be.instanceOf(MessageEmbed);
            expect(handler.handle(testMsgWithSpace)).to.be.instanceOf(MessageEmbed);
            expect(() => handler.handle(testMsgWithGibberish)).to.throw(TypeError);
        });*/

        it("Should give information about currently pending PlanningTasks.", () => {
            const testMsg = new TestMessage(prefix + " list tasks");
            const testMsgWithSpace = new TestMessage("   " + testMsg.content + "   ");
            const testMsgWithGibberish = new TestMessage(testMsg.content + "sads dsadsa");
            
            expect(handler.handle(testMsg)).to.be.instanceOf(MessageEmbed);
            expect(handler.handle(testMsgWithSpace)).to.be.instanceOf(MessageEmbed);
            expect(() => handler.handle(testMsgWithGibberish)).to.throw(TypeError);
        });
    });

    describe("Additional tests for parsing time frames.", () => {
        it("Should add time frame from now until future time if only one given.");
        
        it("Should throw an error if a date is in the past.");

        it("Should pick up dates without from and to keywords");

        it("Should be able to use day names only.");

        it("Should be able to use clock times only.");
    });
});
