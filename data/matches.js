const matches = require("../config/mongoCollections").matches;
let {ObjectId} = require("mongodb");
let users = require("./users");
let chracters = require("./characters");

/**
 *  winner: string
 *  loser: string
 *  winnerPlayed: string
 *  loserPlayed: string
 *  comments: Array
 */


function throwErr(func, reason) {
    throw `matches.js (${func}): ${reason}`;
}

let matchDB = null;

/**
 * Create a new match
 * @param winner Username of the winner
 * @param loser Username of the loser
 * @param winnerPlayed Character the winner played
 * @param loserPlayed Character the loser played
 * @returns {Array} The new match created
 * @throws When given invalid input or a match couldn't be added
 */
async function addMatch(winner, loser, winnerPlayed, loserPlayed) {
    if (!winner || typeof winner !== 'string' || !winner.trim()) {
        throwErr("addMatch", "Given invalid winner");
    }
    if (!loser || typeof loser !== 'string' || !loser.trim()) {
        throwErr("addMatch", "Given invalid loser");
    }
    if (!winnerPlayed || typeof winnerPlayed !== 'string' || !winnerPlayed.trim()) {
        throwErr("addMatch", "Given invalid winnerPlayed");
    }
    if (!winnerPlayed || typeof winnerPlayed !== 'string' || !winnerPlayed.trim()) {
        throwErr("addMatch", "Given invalid winner");
    }

    if (matchDB === null) matchDB = await matches();

    let newMatch = {
        winner: winner,
        loser: loser,
        winnerPlayed: winnerPlayed,
        loserPlayed: loserPlayed,
        comments: []
    };

    const insertInfo = await matchDB.insertOne(newMatch);
    if (insertInfo.insertedCount === 0) {
        throwErr("addMatch", `Failed to add match`);
    }

    await users.addMatch(winner, loser, winnerPlayed, loserPlayed);
    await chracters.addMatch(winnerPlayed, loserPlayed);

    return await getMatch(insertInfo.insertedId.toString());
}

async function getAllMatches() {
    if (matchDB === null) matchDB = await matches();
    return await matchDB.find({}).toArray();
}

async function getMatch(id) {
    if (!id || typeof id !== 'string' || !id.trim()) {
        throwErr("getMatch", "Given invalid id");
    }
    let oid = ObjectId(id);

    if (matchDB === null) matchDB = await matches();

    let findMatch = await matchDB.findOne({_id: oid});
    if (!findMatch) throwErr("addMatch", "Given id could not be found");

    findMatch._id = findMatch._id.toString()
    return findMatch;
}

/**
 * Get all matches that involve a given character
 * Note: might not work as I am not 100% sure about how find works, but it seems right
 * @param charName Character name
 * @returns {Array} Contains all matches involving a given character
 */
async function getMatchesByCharName(charName) {
    if (!charName || typeof charName !== 'string' || !charName.trim()) {
        throwErr("getMatchesByCharname", "Given invalid charName");
    }
    if (matchDB === null) matchDB = await matches();

    let matchesFound = await matchDB.find({
        $or: [{winner: charName}, {loser: charName}],
    });

    matchesFound = matchesFound.toArray();

    for (let i = 0; i < matchesFound.length; i++) {
        matchesFound[i]._id = matchesFound[i]._id.toString();
    }

    return matchesFound;
}

module.exports = {
    addMatch,
    getAllMatches,
    getMatchesByCharName
};
