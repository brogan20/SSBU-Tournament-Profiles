const characters = require("../config/mongoCollections").characters;
var charNameMap = {};
var charNameMapReverse = {};

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

async function checkDB() {
	if (charDB === null) charDB = await characters();
}

function throwErr(func, reason) {
	throw `characters.js (${func}): ${reason}`;
}

/**
 * Add a bunch of characters from an array
 * @param charList Array of 2-Arrays in the format [displayName, abrvName]
 * @returns Nothing
 */
async function initCharDB(charList) {
	if (!charList || !Array.isArray(charList) || charList.length === 0) {
		throwErr("initCharDB", "Must get a valid array");
	}
	await checkDB();

	for (const char of charList) {
		await addChar(char[0], char[1])
	}
}

/**
 * Adds a single character to the DB
 * @param {string} displayName - to act as the displayed name of a character
 * @param {string} abrvName - string to act as the id of a character
 * @returns the new character added to the db
 * @throws when the character cannot be added
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

	await checkDB();

	const newChar = {
		displayName: displayName,
		abrvName: abrvName,
		wins: {},
		losses: {},
	};
	charNameMap[abrvName] = displayName;
	charNameMapReverse[displayName] = abrvName;

	const insertInfo = await charDB.insertOne(newChar);
	if (insertInfo.insertedCount === 0) {
		throwErr("addChar", `Failed to add char ${displayName}`);
	}
	return await getOneChar(abrvName);
}

/**
 * Gets one character using the display name or abbreviated name
 * @param {string} charName - character display name or abbreviated name
 * @returns {Object} the char entry
 * @throws Throws when given invalid input or the char isnt found
 */
async function getOneChar(charName) {
	if (!charName || typeof charName !== "string" || !charName.trim()) {
		throwErr("getOneChar", "Must be given valid character name");
	}
	await checkDB();

	let charSearch = await charDB.findOne({
		$or: [{ displayName: charName }, { abrvName: charName }],
	});

	if (!charSearch) throwErr("getOneChar", charName);

	return charSearch;
}

/**
 * Gets all characters in the DB
 * @returns {Array} Array of objects of each character
 */
async function getAllChar() {
	await checkDB();

	return await charDB.find({}).toArray();
}

/**
 * Adds a win to the winner and a loss to the loser
 * @param {string} winner displayName or abrvName of the winner
 * @param {string} loser displayName or abrvName of the loser
 * @returns {Array} A 2-array of the winner and loser's updated documents
 * @throws Throws when winner or loser is not found in the db or one could not be updated
 */
async function addMatch(winner, loser) {
	if (!winner || typeof winner !== "string" || !winner.trim()) {
		throwErr("addWin", "Must be given valid winner character name");
	}
	if (!loser || typeof loser !== "string" || !loser.trim()) {
		throwErr("addWin", "Must be given valid loser character name");
	}
	await checkDB();

	let winUser = await getOneChar(winner);
	let lossUser = await getOneChar(loser);

	if (!winUser) throwErr("addWin", "Winner could not be found in the db");
	if (!lossUser) throwErr("addWin", "Loser could not be found in the db");

	if (!winUser.wins[lossUser.displayName]) {
		winUser.wins[lossUser.displayName] = 1;
	} else {
		winUser.wins[lossUser.displayName] += 1;
	}

	if (!lossUser.losses[winUser.displayName]) {
		lossUser.losses[winUser.displayName] = 1;
	} else {
		lossUser.losses[winUser.displayName] += 1;
	}

	const updateWins = await charDB.updateOne({ _id: winUser._id }, { $set: winUser });
	if (updateWins.matchedCount === 0)
		throwErr("addWin", "Could not update wins");

	const updateLoss = await charDB.updateOne({ _id: lossUser._id }, { $set: lossUser });
	if (updateLoss.matchedCount === 0)
		throwErr("addWin", "Could not update losses");

	return [winUser, lossUser];
}

module.exports = {
	initCharDB,
	addChar,
	getOneChar,
	getAllChar,
	addMatch,
	charNameMap,
	charNameMapReverse
};
