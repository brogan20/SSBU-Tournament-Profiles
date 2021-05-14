const users = require("../config/mongoCollections").users;

/**
 * username: string
 * displayName: string
 * hashedPassword: string
 * charPlayed: object -
 *      {
 *          char: [wins, losses]
 *      },
 * userPlayed: object -
 *      {
 *          otherUsername: [wins, losses]
 *      }
 */

function throwErr(func, reason) {
    throw `users.js (${func}): ${reason}`;
}

let userDB = null;

/**
 * Adds a user to the database if they don't already exist
 * @param {string} username Case insensitve username
 * @param {string} hashPass The user's hashed password. DO NOT PASS REAL PASSWORDS
 * @returns {Object} The user that was just created
 * @throws Throws when the arguments are invalid, the user already exists, or the addition fails
 */
async function addUser(username, hashPass) {
    if (
        !username ||
        typeof username !== "string" ||
        username.trim().length === 0
    ) {
        throwErr("addUser", "Must recieve valid username");
    }

    if (
        !hashPass ||
        typeof hashPass !== "string" ||
        hashPass.trim().length === 0
    ) {
        throwErr("addUser", "Must recieve valid hashed password");
    }

    if (userDB === null) userDB = await users();
    let found = false;
    try {
        let usernameSearch = await getOneUser(username);
        if (usernameSearch !== null) found = true;
    }
    catch(e) {}
    if (found) {
        throwErr("addUser", "username already exists");
    }

    const newUser = {
        username: username.toUpperCase(),
        displayName: username,
        hashedPassword: hashPass,
        charPlayed: {},
        userPlayed: {},
    };

    let insertInfo = await userDB.insertOne(newUser);
    if (insertInfo.insertedCount === 0) {
        throwErr("addUser", "New user could not be added");
    }

    return await userDB.findOne({_id: insertInfo.insertedId});
}


/**
 * Finds a user using a case-insensitve username
 * @param username User to find
 * @returns {Object} The user requested
 * @throws Throws when given an invalid username or the user cannot be found
 */
async function getOneUser(user) {
    if (!user || typeof user !== 'string' || !user.trim()) {
        throwErr("getOneUser", "Given invalid username");
    }
    if (userDB === null) userDB = await users();
    
    let userSearch = await userDB.findOne({username: user.toUpperCase()});

    if (!userSearch) throwErr("getOneUser", "Could not find user");
    return userSearch;
}

/**
 * Gets all users in the DB
 * @returns {Array} A array of every user
 */
async function getAllUsers() {
    if (userDB === null) userDB = await users();

    return await userDB.find({}).toArray();
}

/**
 * Adds the wins and losses for a match played
 * @param winner Username of the winner
 * @param loser Username of the loser
 * @param winnerPlayed Character the winner played
 * @param loserPlayed Character the loser played
 * @returns {Array} A 2-array of the winner and loser's db entries
 * @throws When given invalid input or a user couldn't be updated
 */
async function addMatch(winner, loser, winnerPlayed, loserPlayed) {
    // note to self, a string checking method might be cool
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

    if (userDB === null) userDB = await users();

    let winUser;
    try {
        winUser = await getOneUser(winner);
    } catch (e) {
        throwErr("addMatch", "Winner does not exist");
    }

    let lossUser;
    try {
        lossUser = await getOneUser(loser);
    } catch (e) {
        throwErr("addMatch", "Loser does not exist");
    }

    if (!winUser.charPlayed[winnerPlayed]) {
        winUser.charPlayed[winnerPlayed] = [1, 0];
    } else {
        winUser.charPlayed[winnerPlayed][0] += 1;
    }

    if (!lossUser.charPlayed[loserPlayed]) {
        lossUser.charPlayed[loserPlayed] = [0, 1];
    } else {
        lossUser.charPlayed[loserPlayed][1] += 1;
    }

    const updateWins = await userDB.updateOne({ _id: lossUser._id }, { $inc: {winUser: 1}});
    if (updateWins.matchedCount === 0)
        throwErr("addMatch", "Could not update Winner");

    const updateLoss = await userDB.updateOne({ _id: lossUser._id }, { $inc: { lossUser: 1}});
    if (updateLoss.matchedCount === 0)
        throwErr("addMatch", "Could not update Loser");

    return [winUser, lossUser]
}


module.exports = {
    addUser,
    getOneUser,
    addMatch,
    getAllUsers
};
