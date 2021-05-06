const characterData = require('./characters');
const userData = require('./users');
const matchData = require('./matches');
const tournamentData = require('./tournaments');


module.exports = {
  users: userData,
  characters: characterData,
  matches: matchData,
  tournaments: tournamentData,
};