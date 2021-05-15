const tournaments = require("../config/mongoCollections").tournaments;
let {ObjectId} = require("mongodb");
let match = require("./matches");

/**
 * name: string
 * players: array of usernames
 * matches: array of matchIds
 */

let tournamentDB = null;

async function checkDB() {
    if (tournamentDB === null) tournamentDB = await tournaments();
}

function throwErr(func, reason) {
    throw `tournaments.js (${func}): ${reason}`;
}

async function addTournament(name, players) {
    await checkDB();
    if (!players || !Array.isArray(players) || players.length === 0) {
        throwErr("addTournament", "Must get a valid array");
    }
    if (!name || typeof name !== "string" || !name.trim()) {
        throwErr("addTournament", "Must be given valid tournament name");
    }

    let newTourny = {
        name: name,
        players: players,
        matches: []
    };

    const insertInfo = await tournamentDB.insertOne(newTourny);
    if (insertInfo.insertedCount === 0) {
        throwErr("addTournament", `Failed to add tournament`);
    }

    return getOneTournament(insertInfo.insertedId.toString());
}

async function getOneTournament(id) {
    if (!id || typeof id !== "string" || !id.trim()) {
        throwErr("getOneTournament", "Must be given id");
    }
    let tid = ObjectId(id);

    await checkDB();

    let findTourny = await tournamentDB.findOne({_id: tid});
    if (!findTourny) throwErr("getOneTournament", "Could not find tournament with given id");

    findTourny._id = findTourny._id.toString();
    return findTourny;
}

async function getAllTournaments() {
    await checkDB();
    let tournamentsFound = await tournamentDB.find({}).toArray();

    for (let i = 0; i < tournamentsFound.length; i++) {
        tournamentsFound[i]._id = tournamentsFound[i]._id.toString();
    }

    return tournamentsFound;
}

async function findMatchTournament(matchId){
    if (!matchId || typeof matchId !== "string" || !matchId.trim()){
        throwErr("findMatchTournament", "Must be given matchId");
    }

    await checkDB();

    let findTourny = await tournamentDB.findOne({matches: {$in: [ObjectId(matchId)]}});
    if (!findTourny) return undefined;

    findTourny._id = findTourny._id.toString();
    return findTourny;
}

async function addMatchToTournament(tournamentId, matchId) {
    if (!tournamentId || typeof tournamentId !== "string" || !tournamentId.trim()) {
        throwErr("addMatchToTournament", "Must be given tournamentId");
    }
    let tid = ObjectId(tournamentId);
    if (!matchId || typeof matchId !== "string" || !matchId.trim()) {
        throwErr("addMatchToTournament", "Must be given matchId");
    }
    mid = ObjectId(matchId);

    // Check match exists
    try {
        await match.getMatch(matchId);
    } catch (e) {
        throwErr("addMatchToTournament", "Could not find given match");
    }

    let tournyCheck;
    try {
        tournyCheck = await getOneTournament(tournamentId);
    } catch (e) {
        throwErr("addMatchToTournament", "Could not find given tournament");
    }

    tournyCheck.matches.push(mid);
    delete tournyCheck._id;

    const updateTournament = await tournamentDB.updateOne({ _id: tid }, { $set: tournyCheck });
    if (updateTournament.modifiedCount === 0)
        throwErr("addMatchToTournament", "Could not update tournament");

    return tournyCheck;
}

module.exports = {
    addTournament,
    getOneTournament,
    getAllTournaments,
    findMatchTournament,
    addMatchToTournament
};
