const users = require("../config/mongoCollections").users;

/**
 * username: string
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

// Entry layout:

function throwErr(func, reason) {
    throw `users.js (${func}): ${reason}`;
}

let userDB = null;

// To be used at account creation
// Will also throw if the username given already exists in the db
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

    let usernameSearch = await getOneUser(username);
    if (usernameSearch !== null) throwErr("addUser", "username already exists");

    const newUser = {
        username: username.toUpperCase(),
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


// Retrieves a user based on username
// Case insensitive
async function getOneUser(username) {
    if (!username || typeof username !== 'string' || !username.trim()) {
        throwErr("getOneUser", "Given invalid username");
    }

    if (userDB === null) userDB = await users();

    let userSearch = await userDB.findOne({username: username.toUpperCase()});

    if (!userSearch) throwErr("getOneUser", "Could not find user");
    return userSearch;
}

async function getAllUsers() {
    if (userDB === null) userDB = await users();

    return await userDB.find({}).toArray();
}

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


    return [winUser, lossUser]
}


module.exports = {
    addUser,
    getOneUser,
    addMatch,
    getAllUsers
};
