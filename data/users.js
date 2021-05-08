const users = require("../config/mongoCollections").users;

function throwErr(func, reason) {
	throw `characters.js (${func}): ${reason}`;
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
        charactersPlayed: [],
        winsUsers: {},
        lossesUsers: {},
        winsCharacters: {},
        lossesCharacters: {},
    };

    let insertInfo = await userDB.insertOne(newUser); 
    if (insertInfo.insertedCount === 0) {
        throwErr("addUser", "New user could not be added");
    }

    return await userDB.findOne({ _id: insertInfo.insertedId});
}


// Retrieves a user based on username
// Case insensitive
async function getOneUser(username) {
    if (!username || typeof username !== 'string' || !username.trim()) {
        throwErr("getOneUser", "Given invalid username");
    }

    if (userDB === null) userDB = await users();

    let userSearch = await userDB.findOne({ username: username.toUpperCase()});

    // The routes team said they're good with getting a null if the 
    // user isn't found so no further checking is needed
    return userSearch;
}

module.exports = {
    addUser,
    getOneUser,
};
