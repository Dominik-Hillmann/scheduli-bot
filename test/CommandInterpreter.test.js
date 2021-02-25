import chai from "chai";
import { Controller } from "../src/controller/Controller.js";
import { CommandInterpreter } from "../src/view/CommandInterpreter.js";
import { Message, Client } from "discord.js";
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
    }

    deletePlanningTask(id) {
        this.calledDeletePlanningTask = true;
    }

    addTimeFrame(timeFrame) {
        this.calledAddTimeFrame = true;
    }

    deleteReminder(id) {
        this.calledDeleteReminder = true;
    }
}

/**
 * @class Simulates a Discord message without having to create a new client.
 * It has all the relevant methods and attributes of a Discord message.
 */
class TestMessage {
    constructor(content) {
        this.content = content;
    }
}


describe("Correct functionality of the CommandInterpreter class:", () => {
    it("Should throw an error if message does not contain the correct prefix", () => {
        const testController = new TestController();
        const handler = new CommandInterpreter(testController);
        const msg = new TestMessage("Das ist ein Test.");

        expect(() => handler.handle(msg)).to.throw(TypeError);
    });
});
