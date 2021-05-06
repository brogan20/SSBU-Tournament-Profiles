const characters = require("../config/mongoCollections").characters;

let charDB = null;

function throwErr(func, reason) {
	throw `characters.js (${func}): ${reason}`;
}

// Pass in an array of either strings or 3-length arrays
// 3-length arrays should be in the format [charName, wins, losses]
// String should only be the character name
// Returns nothing
// Throws if inserting a character fails
async function initCharDB(charList) {
	if (!charList || !Array.isArray(charList) || charList.length === 0) {
		throwErr("initCharDB", "Must get a valid array");
	}
	if (charDB === null) charDB = await characters();

	for (char of charList) {
		if (Array.isArray(char)) {
			await addChar(char[0], char[1], char[2]);
		} else {
			await addChar(char, 0, 0);
		}
	}
}

// Adds a single character to the DB
async function addChar(displayName, wins, losses) {
	if (
		!displayName ||
		typeof displayName !== "string" ||
		displayName.trim().length === 0
	) {
		throwErr("addChar", "Must be given valid character name");
	}

	if (!wins || typeof wins !== "number" || wins < 0) {
		throwErr("addChar", "Must recieve valid number of wins");
	}
	if (!losses || typeof losses !== "number" || losses < 0) {
		throwErr("addChar", "Must recieve valid number of losses");
	}
    if (charDB === null) charDB = await characters();

    const newChar = {
        displayName: displayName,
        wins: wins,
        losses: losses,
    };

    const insertInfo = await charDB.insertOne(newChar);
    if (insertInfo.insertedCount === 0) {
        throwErr("addChar", `Failed to add char ${displayName}`);
    }

    return 1;
}

module.exports = {
	initCharDB,
    addChar,
};
