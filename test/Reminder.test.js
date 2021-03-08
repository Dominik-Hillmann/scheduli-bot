import chai from "chai";
const expect = chai.expect;

import fs from "fs";
import dotenv from "dotenv";
dotenv.config()

import { PendingMessages } from "../src/model/PendingMessages.js";
import { Reminder } from "../src/model/Reminder.js";


describe("Checks whether the Reminder class works correctly.", () => {
    const remindersDir = "./data/reminders/";

    const testReminder = new Reminder({
        id: 1,
        time: 1614722506,
        members: ["123", "312", "987"]
    });


    class MockClient {
        constructor(channel) {
            this.channels = new MockChannelManager(channel); 
        }
    }

    class MockChannelManager {
        constructor(channel) {
            this.channel = channel;
        }
        
        fetch(id) {
            return new Promise((resolve, reject) => {
                try {
                    resolve(this.channel);
                } catch {
                    reject();
                }
            });
        }
    }

    class MockChannel {
        constructor() {
            this.sent = false;
        }

        send(msg) {
            this.sent = true;
        }
    }



    const pendingMsgs = new PendingMessages(new MockClient(new MockChannel()), process.env.REMINDER_CHANNEL_ID);
    /**
     * Deleted the reminder.
     * @param {number|string} id The ID.
     */
    const deleteReminder = id => {
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

    it("Should correctly create reminder.", () => {
        const timeOutReminder = new Reminder({
            time: 1748228405,
            members: ["123", "321"]
        });

        pendingMsgs.add(timeOutReminder);
        expect(pendingMsgs.getReminderIds()).to.include(timeOutReminder.getId());
        expect(pendingMsgs.get(timeOutReminder.getId())).to.not.be.undefined;
        expect(pendingMsgs.get(timeOutReminder.getId())).to.not.be.null;

        pendingMsgs.destroyAll();
    });

    it("Should destroy a reminder.", () => {
        const now = new Date();
        const plusFewSecs = new Date();
        plusFewSecs.setSeconds(now.getSeconds() + 5);

        const timeOutReminder = new Reminder({
            time: plusFewSecs,
            members: ["123", "321"]
        });

        pendingMsgs.add(timeOutReminder);
        expect(pendingMsgs.getReminderIds()).to.include(timeOutReminder.getId());
        pendingMsgs.destroy(timeOutReminder.getId());
        expect(pendingMsgs.getReminderIds()).to.not.include(timeOutReminder.getId());
    });

    it("Should trigger message after interval.", function (done) {
        const testChannel = new MockChannel();
        const pendingMsgs = new PendingMessages(new MockClient(testChannel), 'mockId');
        const in5s = new Date();
        in5s.setSeconds(in5s.getSeconds() + 5);

        const reminderIn5s = new Reminder({
            id: 1234,
            members: ["321", "123"],
            time: in5s
        });

        pendingMsgs.add(reminderIn5s);
        this.timeout(6000); // sets new maximum timeout time
        setTimeout(() => {
            expect(testChannel.sent).to.be.true;
            done(); // For later: is parameter of test function.
        }, 5000);
        
    });

    it("Should correctly write the reminder to disk.", () => {
        const toBeSavedReminder = new Reminder({
            time: 914611955,
            members: ["321", "123"]
        });

        const id = toBeSavedReminder.getId();
        expect(fs.readdirSync(remindersDir)).to.not.include(`${id}.json`);
        toBeSavedReminder.toJson();
        expect(Reminder.fromJson(`${id}.json`)).to.eql(toBeSavedReminder);
        deleteReminder(toBeSavedReminder.getId());
    });

    it("Should correctly read a reminder from disk.", () => {
        expect(Reminder.fromJson("test-reminder-1.json")).to.eql(testReminder);
    });
});