import { 
    MessageMentions, 
    User 
} from "discord.js";

class PlanningTask {
    /** The invited people to the planned meeting. */
    meetingMembers;

    static usedIds;

    /**
     * 
     * @param {MessageMentions} members 
     */
    constructor(members) {
        this.meetingMembers = members;
    }

    /**
     * @returns {string[]} The members' IDs.
     */
    getMemberIds() {
        let memberIds = [];
        this.meetingMembers.array.forEach(member => {
            memberIds.push(member.id)
        });

        return memberIds;
    }

    toJson() {

    }

    static fromJson(path) {

    }

}

module.exports.PlanningTask = PlanningTask;