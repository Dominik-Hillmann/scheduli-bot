import chai from "chai";
const expect = chai.expect;
import fs from "fs";
import { Reminder } from "../src/model/Reminder.js";

describe("Checks whether the Reminder class works correctly.", () => {
    const remindersDir = "./data/reminders/";

    const testReminder = new Reminder({
        id: 1,
        time: 1614712058,
        members: ["123", "312", "987"]
    });

    /**
     * Deleted the reminder.
     * @param {number|string} id The ID.
     */
    const deleteReminder = id => {
        console.log(`./data/reminders/${id}.json`);
        fs.unlinkSync(`./data/reminders/${id}.json`);
    };

    it("Should instentiate correctly using a new ID.", () => {
        const currentReminderNames = fs.readdirSync(remindersDir);
        const currentReminderIds = currentReminderNames.map(name => {
            return Reminder.fromJson(name).getId();
        });

        const createdReminder = new Reminder({
            members: ["123", "321"],
            time: new Date()
        });
        expect(currentReminderIds).to.not.include(createdReminder.getId());
    });

    it("Should correctly create reminder.");

    it("Should destroy a reminder.");

    it("Should correctly write the reminder to disk.", () => {
        const toBeSavedReminder = new Reminder({
            time: 914611955,
            members: ["321", "123"]
        });

        const id = toBeSavedReminder.getId();
        expect(fs.readdirSync(remindersDir)).to.not.include(`${id}.json`);
        toBeSavedReminder.toJson();
        expect(fs.readdirSync(remindersDir)).to.include(`${id}.json`);
        expect(Reminder.fromJson(`${id}.json`)).to.eql(toBeSavedReminder);
        deleteReminder(toBeSavedReminder.getId());
    });

    it("Should correctly read a reminder from disk.", () => {
        expect(Reminder.fromJson("test-reminder.json")).to.eql(testReminder);
    });
});