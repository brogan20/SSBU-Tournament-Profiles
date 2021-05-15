const connection = require('./mongoConnection');

const matches = require('../data/matches');
const characters = require('../data/characters');
const users = require('../data/users');
const tournaments = require('../data/tournaments');

async function runSetup() {
  const db = await connection();
  
  try {
    // We can recover from this; if it can't drop the collection, it's because
    await db.collection('matches').drop();
  } catch(e) {
    // the collection does not exist yet!
  }

  try {
    // We can recover from this; if it can't drop the collection, it's because
    await db.collection('characters').drop();
  } catch (e) {
    // the collection does not exist yet!
  }

  try {
    // We can recover from this; if it can't drop the collection, it's because
    await db.collection('users').drop();
  } catch (e) {
    // the collection does not exist yet!
  }
  try {
    // We can recover from this; if it can't drop the collection, it's because
    await db.collection('tournaments').drop();
  } catch (e) {
    // the collection does not exist yet!
  }

  await characters.initCharDB(
  [["Mario","mario"],
  ["Donkey Kong","donkeykong"],
  ["Link","link"],
  ["Samus","samus"],
  ["Dark Samus","darksamus"],
  ["Yoshi","yoshi"],
  ["Kirby","kirby"],
  ["Fox","fox"],
  ["Pikachu","pikachu"],
  ["Luigi","luigi"],
  ["Ness","ness"],
  ["Captain Falcon","captainfalcon"],
  ["Jigglypuff","jigglypuff"],
  ["Peach","peach"],
  ["Daisy","daisy"],
  ["Bowser","bowser"],
  ["Ice Climbers","iceclimbers"],
  ["Sheik","sheik"],
  ["Zelda","zelda"],
  ["Dr. Mario","drmario"],
  ["Pichu","pichu"],
  ["Falco","falco"],
  ["Marth","marth"],
  ["Lucina","lucina"],
  ["Young Link","younglink"],
  ["Ganondorf","ganondorf"],
  ["Mewtwo","mewtwo"],
  ["Roy","roy"],
  ["Chrom","chrom"],
  ["Mr. Game & Watch","mrgameandwatch"],
  ["Meta Knight","metaknight"],
  ["Pit","pit"],
  ["Dark Pit","darkpit"],
  ["Zero Suit Samus","zerosuitsamus"],
  ["Wario","wario"],
  ["Snake","snake"],
  ["Ike","ike"],
  ["Pokémon Trainer","pokemontrainer"],
  ["Diddy Kong","diddykong"],
  ["Lucas","lucas"],
  ["Sonic","sonic"],
  ["King Dedede","kingdedede"],
  ["Olimar","olimar"],
  ["Lucario","lucario"],
  ["R.O.B.","rob"],
  ["Toon Link","toonlink"],
  ["Wolf","wolf"],
  ["Villager","villager"],
  ["Mega Man","megaman"],
  ["Wii Fit Trainer","wiifittrainer"],
  ["Rosalina & Luma","rosalinaandluma"],
  ["Little Mac","littlemac"],
  ["Greninja","greninja"],
  ["Mii Brawler","miibrawler"],
  ["Mii Swordfighter","misswordfighter"],
  ["Mii Gunner","miigunner"],
  ["Palutena","palutena"],
  ["Pac-Man","pacman"],
  ["Robin","robin"],
  ["Shulk","shulk"],
  ["Bowser Jr.","bowserjr"],
  ["Duck Hunt","duckhunt"],
  ["Ryu","ryu"],
  ["Ken","ken"],
  ["Cloud","cloud"],
  ["Corrin","corrin"],
  ["Bayonetta","bayonetta"],
  ["Inkling","inkling"],
  ["Ridley","ridley"],
  ["Simon","simon"],
  ["Richter","richter"],
  ["King K Rool","kingkrool"],
  ["Isabelle","isabelle"],
  ["Incineroar","incineroar"],
  ["Piranha Plant","piranhaplant"],
  ["Joker","joker"],
  ["Hero","hero"],
  ["Banjo & Kazooie","banjoandkazooie"],
  ["Terry","terry"],
  ["Byleth","byleth"],
  ["Min Min","minmin"],
  ["Steve/Alex","stevealex"],
  ["Sephiroth","sephiroth"],
  ["Pyra/Mythra","pyramythra"]]);

  let tourney1 = await tournaments.addTournament('FUCK THIS CLASS', ['RobotWizard', "Shinks", "pencilman", "brogan20"])
  await users.addUser('RobotWizard', 'Password1');
  await users.addUser('Shinks', 'Password2');
  await users.addUser('brogan20', 'Password3');
  await users.addUser('pencilman', 'Password4');

  await matches.addMatch('RobotWizard', 'brogan20', 'shulk', 'rosalinaandluma').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('RobotWizard', 'Shinks', 'shulk', 'sheik').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'brogan20', 'sheik', 'kirby').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('brogan20', 'pencilman', 'kirby', 'donkeykong').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'pencilman', 'zelda', 'donkeykong').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('brogan20', 'RobotWizard', 'bowser', 'shulk').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('pencilman', 'brogan20', 'donkeykong', 'kirby').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('pencilman', 'Shinks', 'mrgameandwatch', 'zelda').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'pencilman', 'sheik', 'donkeykong').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'brogan20', 'zelda', 'bowser').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('pencilman', 'RobotWizard', 'miibrawler', 'kirby').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('brogan20', 'Shinks', 'kirby', 'zelda').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'brogan20', 'sheik', 'rosalinaandluma').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('pencilman', 'Shinks', 'donkeykong', 'sheik').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'RobotWizard', 'sheik', 'kirby').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('RobotWizard', 'brogan20', 'luigi', 'bowser').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'pencilman', 'sheik', 'mrgameandwatch').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('brogan20', 'RobotWizard', 'rosalinaandluma', 'luigi').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('brogan20', 'Shinks', 'bowser', 'zelda').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'brogan20', 'zelda', 'rosalinaandluma').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'RobotWizard', 'zelda', 'shulk').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('brogan20', 'pencilman', 'bowser', 'donkeykong').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('brogan20', 'Shinks', 'rosalinaandluma', 'isabelle').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'RobotWizard', 'sheik', 'luigi').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('brogan20', 'RobotWizard', 'bowser', 'luigi').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('pencilman', 'RobotWizard', 'mrgameandwatch', 'kirby').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('brogan20', 'RobotWizard', 'bowser', 'kirby').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('pencilman', 'brogan20', 'miibrawler', 'kirby').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'pencilman', 'isabelle', 'donkeykong').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('brogan20', 'Shinks', 'rosalinaandluma', 'sheik').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('pencilman', 'RobotWizard', 'mrgameandwatch', 'kirby').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('pencilman', 'RobotWizard', 'mrgameandwatch', 'shulk').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('pencilman', 'RobotWizard', 'miibrawler', 'luigi').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('RobotWizard', 'pencilman', 'shulk', 'miibrawler').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('brogan20', 'pencilman', 'rosalinaandluma', 'mrgameandwatch').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('brogan20', 'Shinks', 'rosalinaandluma', 'zelda').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('brogan20', 'RobotWizard', 'bowser', 'shulk').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('brogan20', 'pencilman', 'kirby', 'donkeykong').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('pencilman', 'brogan20', 'donkeykong', 'rosalinaandluma').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'RobotWizard', 'zelda', 'shulk').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'pencilman', 'sheik', 'donkeykong').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'brogan20', 'isabelle', 'rosalinaandluma').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('RobotWizard', 'pencilman', 'kirby', 'donkeykong').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('pencilman', 'Shinks', 'donkeykong', 'zelda').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('brogan20', 'RobotWizard', 'kirby', 'luigi').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'pencilman', 'isabelle', 'miibrawler').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('pencilman', 'brogan20', 'mrgameandwatch', 'rosalinaandluma').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'brogan20', 'isabelle', 'kirby').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('brogan20', 'pencilman', 'bowser', 'mrgameandwatch').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('RobotWizard', 'brogan20', 'luigi', 'bowser').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'brogan20', 'zelda', 'rosalinaandluma').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('brogan20', 'pencilman', 'bowser', 'miibrawler').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('RobotWizard', 'Shinks', 'shulk', 'isabelle').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('pencilman', 'RobotWizard', 'donkeykong', 'kirby').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'RobotWizard', 'sheik', 'luigi').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('brogan20', 'Shinks', 'rosalinaandluma', 'zelda').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('brogan20', 'RobotWizard', 'kirby', 'kirby').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('brogan20', 'RobotWizard', 'kirby', 'luigi').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'brogan20', 'isabelle', 'rosalinaandluma').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('brogan20', 'Shinks', 'kirby', 'zelda').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('brogan20', 'pencilman', 'rosalinaandluma', 'mrgameandwatch').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('pencilman', 'brogan20', 'mrgameandwatch', 'bowser').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'brogan20', 'zelda', 'rosalinaandluma').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('pencilman', 'RobotWizard', 'donkeykong', 'shulk').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('brogan20', 'pencilman', 'kirby', 'mrgameandwatch').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('brogan20', 'Shinks', 'bowser', 'sheik').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('pencilman', 'RobotWizard', 'donkeykong', 'luigi').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('RobotWizard', 'Shinks', 'luigi', 'zelda').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'brogan20', 'zelda', 'bowser').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('RobotWizard', 'Shinks', 'shulk', 'zelda').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('brogan20', 'pencilman', 'kirby', 'miibrawler').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('brogan20', 'RobotWizard', 'kirby', 'luigi').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'brogan20', 'isabelle', 'bowser').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('pencilman', 'Shinks', 'miibrawler', 'isabelle').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('RobotWizard', 'pencilman', 'luigi', 'donkeykong').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'pencilman', 'isabelle', 'donkeykong').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('RobotWizard', 'brogan20', 'luigi', 'rosalinaandluma').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('pencilman', 'RobotWizard', 'mrgameandwatch', 'kirby').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('RobotWizard', 'Shinks', 'luigi', 'zelda').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('pencilman', 'RobotWizard', 'mrgameandwatch', 'luigi').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'RobotWizard', 'sheik', 'shulk').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'brogan20', 'sheik', 'bowser').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'RobotWizard', 'isabelle', 'kirby').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('brogan20', 'Shinks', 'rosalinaandluma', 'zelda').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('pencilman', 'RobotWizard', 'miibrawler', 'luigi').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('RobotWizard', 'pencilman', 'luigi', 'donkeykong').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('pencilman', 'brogan20', 'donkeykong', 'bowser').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('pencilman', 'Shinks', 'miibrawler', 'sheik').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('RobotWizard', 'pencilman', 'shulk', 'mrgameandwatch').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('brogan20', 'Shinks', 'rosalinaandluma', 'zelda').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('brogan20', 'pencilman', 'bowser', 'miibrawler').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('pencilman', 'Shinks', 'donkeykong', 'isabelle').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'RobotWizard', 'isabelle', 'shulk').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('RobotWizard', 'pencilman', 'kirby', 'miibrawler').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('brogan20', 'pencilman', 'kirby', 'mrgameandwatch').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('pencilman', 'brogan20', 'miibrawler', 'rosalinaandluma').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('RobotWizard', 'pencilman', 'shulk', 'donkeykong').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('brogan20', 'pencilman', 'rosalinaandluma', 'miibrawler').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('brogan20', 'RobotWizard', 'bowser', 'luigi').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('pencilman', 'RobotWizard', 'miibrawler', 'kirby').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
}

exports = module.exports = { runSetup };