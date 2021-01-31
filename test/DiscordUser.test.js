// Testing library
import chai from "chai";
const expect = chai.expect;
// Tested modules
import { DiscordUser } from "../src/model/DiscordUser.js";

describe("Make sure the DiscordUser class works correctly.", () => {
    const id = "687942614766452748";
    it("Should be instanciated correctly.", () => {
        const user = new DiscordUser(id);
        expect(user).to.not.be.undefined;
        expect(user).to.not.be.empty;
    });

    it("Should produce a correct reference to a user.", () => {
        const user = new DiscordUser(id);
        expect(user.getMention()).to.equal(`<@${id}>`);
        expect(user.getId()).to.equal(id);
    });
});