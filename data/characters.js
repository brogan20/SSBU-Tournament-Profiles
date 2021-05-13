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

async function checkDB() {
	if (charDB === null) charDB = await characters();
}

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
// async function initCharDB(charList) {
// 	if (!charList || !Array.isArray(charList) || charList.length === 0) {
// 		throwErr("initCharDB", "Must get a valid array");
// 	}
// 	await checkDB();
//
// 	for (char of charList) {
// 		if (Array.isArray(char)) {
// 			await addChar(char[0], char[1], char[2]);
// 		} else {
// 			await addChar(char, 0, 0);
// 		}
// 	}
// }

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

	if (!charSearch) throwErr("getOneChar", "Character not found");

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

	let win = await getOneChar(winner);
	let loss = await getOneChar(loser);

	if (!win) throwErr("addWin", "Winner could not be found in the db");
	if (!loss) throwErr("addWin", "Loser could not be found in the db");

	if (!win.wins[loss.displayName]) {
		win.wins[loss.displayName] = 1;
	} else {
		win.wins[loss.displayName] += 1;
	}

	if (!loss.losses[win.displayName]) {
		loss.losses[win.displayName] = 1;
	} else {
		loss.losses[win.displayName] += 1;
	}

	const updateWins = await charDB.updateOne({ _id: win._id }, { $set, win });
	if (updateWins.matchedCount === 0)
		throwErr("addWin", "Could not update wins");

	const updateLoss = await charDB.updateOne({ _id: loss._id }, { $set, loss });
	if (updateLoss.matchedCount === 0)
		throwErr("addWin", "Could not update losses");

	return [win, loss];
}

module.exports = {
	addChar,
	getOneChar,
	getAllChar,
	addWin: addMatch,
};
