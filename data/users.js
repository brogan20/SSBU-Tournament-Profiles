const users = require("../config/mongoCollections").users;

function throwErr(func, reason) {
	throw `characters.js (${func}): ${reason}`;
}

let userDB = null;

// To be used at account creation
// Will also throw if the username given already exists in the db
async function addUser(username, hashPass) {
	if (userDB === null) userDB = await users();

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

    let usernameSearch = await userDB.findOne({ "username": username.toUpperCase()});
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

module.exports = {
    addUser,
};
