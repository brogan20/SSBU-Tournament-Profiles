const characters = require("../config/mongoCollections").characters;

// Entry layout:
/**
 * displayName: string
 * abrvName: string
 * wins: object -
 *      {
 *          displayName: winsAgainst,
 *      }
 *  losses: object -
 *      {
 *          displayName: lossesAgainst,
 *      }
 */
let charDB = null;

function throwErr(func, reason) {
	throw `characters.js (${func}): ${reason}`;
}

/**
 * Pass in an array of either strings or 3-length arrays
 * 3-length arrays should be in the format [charName, wins, losses]
 * String should only be the character name
 * Returns nothing
 * Throws if inserting a character fails
 * TODO: Update to work with new character storage
 */
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

/**
 * Adds a single character to the DB
 * Throws if the character could not be added
 * @param {string} displayName - to act as the displayed name of a character
 * @param {string} abrvName - string to act as the id of a character
 */
async function addChar(displayName, abrvName) {
	if (
		!displayName ||
		typeof displayName !== "string" ||
		displayName.trim().length === 0
	) {
		throwErr("addChar", "Must be given valid character name");
	}

	if (!abrvName || typeof abrvName !== "string" || !abrvName.trim()) {
		throwErr("addChar", "Must be given valid abbreviated name");
	}

	if (charDB === null) charDB = await characters();

	const newChar = {
		displayName: displayName,
		abrvName: abrvName,
		wins: {},
		losses: {},
	};

	const insertInfo = await charDB.insertOne(newChar);
	if (insertInfo.insertedCount === 0) {
		throwErr("addChar", `Failed to add char ${displayName}`);
	}

	return 1;
}

/**
 * Gets one character using the display name or abbreviated name
 * Returns the char entry if found, otherwise null
 * @param {string} charName - character display name or abbreviated name
 */
async function getOneChar(charName) {
	if (!charName || typeof charName !== "string" || !charName.trim()) {
		throwErr("getOneChar", "Must be given valid character name");
	}

	if (charDB === null) charDB = await characters();

	let charSearch = await charDB.findOne({
		$or: [{ displayName: charName }, { abrvName: charName }],
	});

    return charSearch;
}

async function getAllChar() {
	if (charDB === null) charDB = await characters();

    let allChar = await charDB.find({}).toArray();

    return allChar;
}

module.exports = {
	addChar,
    getOneChar,
    getAllChar,
};
