const connection = require('./mongoConnection');

const matches = require('../data/matches');
const characters = require('../data/characters');
const users = require('../data/users');

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

  await users.addUser('RobotWizard', 'Password1');
  await users.addUser('Shinks', 'Password2');
  await users.addUser('brogan20', 'Password3');
  await users.addUser('pencilman', 'Password4');

  await matches.addMatch('Shinks', 'RobotWizard', 'zelda', 'luigi');
  /*
  matches.addMatch('pencilman', 'Shinks', 'gameandwatch', 'zelda');
  matches.addMatch('Shinks', 'RobotWizard', 'sheik', 'shulk');
  matches.addMatch('pencilman', 'Shinks', 'miibrawler', 'zelda');
  matches.addMatch('brogan20', 'pencilman', 'kirby', 'gameandwatch');
  matches.addMatch('pencilman', 'Shinks', 'donkeykong', 'isabelle');
  matches.addMatch('RobotWizard', 'Shinks', 'luigi', 'sheik');
  matches.addMatch('Shinks', 'brogan20', 'zelda', 'kirby');
  matches.addMatch('RobotWizard', 'brogan20', 'luigi', 'kirby');
  matches.addMatch('brogan20', 'RobotWizard', 'kirby', 'shulk');
  matches.addMatch('pencilman', 'Shinks', 'donkeykong', 'zelda');
  matches.addMatch('RobotWizard', 'Shinks', 'luigi', 'isabelle');
  matches.addMatch('brogan20', 'Shinks', 'rosalinaandluma', 'isabelle');
  matches.addMatch('Shinks', 'RobotWizard', 'isabelle', 'luigi');
  matches.addMatch('brogan20', 'Shinks', 'bowser', 'isabelle');
  matches.addMatch('Shinks', 'pencilman', 'sheik', 'miibrawler');
  matches.addMatch('brogan20', 'RobotWizard', 'kirby', 'shulk');
  matches.addMatch('pencilman', 'Shinks', 'miibrawler', 'zelda');
  matches.addMatch('Shinks', 'RobotWizard', 'zelda', 'kirby');
  matches.addMatch('Shinks', 'pencilman', 'isabelle', 'gameandwatch');
  matches.addMatch('brogan20', 'Shinks', 'rosalinaandluma', 'zelda');
  matches.addMatch('brogan20', 'Shinks', 'bowser', 'sheik');
  matches.addMatch('RobotWizard', 'brogan20', 'shulk', 'kirby');
  matches.addMatch('pencilman', 'Shinks', 'gameandwatch', 'zelda');
  matches.addMatch('Shinks', 'brogan20', 'isabelle', 'bowser');
  matches.addMatch('RobotWizard', 'Shinks', 'luigi', 'isabelle');
  matches.addMatch('pencilman', 'Shinks', 'donkeykong', 'zelda');
  matches.addMatch('Shinks', 'RobotWizard', 'isabelle', 'shulk');
  matches.addMatch('Shinks', 'pencilman', 'sheik', 'donkeykong');
  matches.addMatch('RobotWizard', 'brogan20', 'shulk', 'kirby');
  matches.addMatch('brogan20', 'RobotWizard', 'bowser', 'kirby');
  matches.addMatch('brogan20', 'RobotWizard', 'kirby', 'luigi');
  matches.addMatch('brogan20', 'RobotWizard', 'rosalinaandluma', 'luigi');
  matches.addMatch('brogan20', 'RobotWizard', 'bowser', 'kirby');
  matches.addMatch('pencilman', 'RobotWizard', 'gameandwatch', 'kirby');
  matches.addMatch('Shinks', 'RobotWizard', 'sheik', 'shulk');
  matches.addMatch('RobotWizard', 'pencilman', 'kirby', 'donkeykong');
  matches.addMatch('Shinks', 'RobotWizard', 'isabelle', 'kirby');
  matches.addMatch('pencilman', 'RobotWizard', 'miibrawler', 'luigi');
  matches.addMatch('pencilman', 'Shinks', 'gameandwatch', 'zelda');
  matches.addMatch('pencilman', 'brogan20', 'donkeykong', 'kirby');
  matches.addMatch('Shinks', 'pencilman', 'isabelle', 'donkeykong');
  matches.addMatch('RobotWizard', 'Shinks', 'luigi', 'sheik');
  matches.addMatch('brogan20', 'pencilman', 'bowser', 'miibrawler');
  matches.addMatch('pencilman', 'RobotWizard', 'donkeykong', 'luigi');
  matches.addMatch('Shinks', 'RobotWizard', 'isabelle', 'luigi');
  matches.addMatch('brogan20', 'RobotWizard', 'kirby', 'shulk');
  matches.addMatch('Shinks', 'brogan20', 'zelda', 'kirby');
  matches.addMatch('brogan20', 'pencilman', 'bowser', 'gameandwatch');
  matches.addMatch('RobotWizard', 'brogan20', 'luigi', 'kirby');
  matches.addMatch('RobotWizard', 'pencilman', 'shulk', 'gameandwatch');
  matches.addMatch('brogan20', 'Shinks', 'kirby', 'isabelle');
  matches.addMatch('Shinks', 'RobotWizard', 'isabelle', 'shulk');
  matches.addMatch('RobotWizard', 'brogan20', 'luigi', 'bowser');
  matches.addMatch('Shinks', 'pencilman', 'zelda', 'miibrawler');
  matches.addMatch('pencilman', 'RobotWizard', 'donkeykong', 'kirby');
  matches.addMatch('RobotWizard', 'pencilman', 'shulk', 'donkeykong');
  matches.addMatch('RobotWizard', 'brogan20', 'shulk', 'rosalinaandluma');
  matches.addMatch('brogan20', 'RobotWizard', 'bowser', 'luigi');
  matches.addMatch('Shinks', 'RobotWizard', 'isabelle', 'luigi');
  matches.addMatch('pencilman', 'RobotWizard', 'donkeykong', 'kirby');
  matches.addMatch('Shinks', 'pencilman', 'zelda', 'gameandwatch');
  matches.addMatch('Shinks', 'RobotWizard', 'zelda', 'shulk');
  matches.addMatch('pencilman', 'RobotWizard', 'gameandwatch', 'kirby');
  matches.addMatch('brogan20', 'pencilman', 'rosalinaandluma', 'gameandwatch');
  matches.addMatch('brogan20', 'RobotWizard', 'bowser', 'luigi');
  matches.addMatch('RobotWizard', 'brogan20', 'kirby', 'bowser');
  matches.addMatch('RobotWizard', 'brogan20', 'luigi', 'bowser');
  matches.addMatch('brogan20', 'pencilman', 'rosalinaandluma', 'donkeykong');
  matches.addMatch('brogan20', 'RobotWizard', 'kirby', 'luigi');
  matches.addMatch('brogan20', 'pencilman', 'rosalinaandluma', 'gameandwatch');
  matches.addMatch('Shinks', 'pencilman', 'zelda', 'donkeykong');
  matches.addMatch('Shinks', 'RobotWizard', 'sheik', 'kirby');
  matches.addMatch('pencilman', 'brogan20', 'gameandwatch', 'kirby');
  matches.addMatch('RobotWizard', 'brogan20', 'kirby', 'rosalinaandluma');
  matches.addMatch('RobotWizard', 'pencilman', 'shulk', 'miibrawler');
  matches.addMatch('pencilman', 'RobotWizard', 'miibrawler', 'shulk');
  matches.addMatch('RobotWizard', 'brogan20', 'kirby', 'rosalinaandluma');
  matches.addMatch('Shinks', 'pencilman', 'sheik', 'miibrawler');
  matches.addMatch('Shinks', 'brogan20', 'sheik', 'kirby');
  matches.addMatch('brogan20', 'pencilman', 'rosalinaandluma', 'donkeykong');
  matches.addMatch('RobotWizard', 'pencilman', 'kirby', 'donkeykong');
  matches.addMatch('Shinks', 'pencilman', 'zelda', 'donkeykong');
  matches.addMatch('RobotWizard', 'brogan20', 'luigi', 'bowser');
  matches.addMatch('pencilman', 'brogan20', 'gameandwatch', 'rosalinaandluma');
  matches.addMatch('RobotWizard', 'pencilman', 'shulk', 'donkeykong');
  matches.addMatch('pencilman', 'Shinks', 'miibrawler', 'sheik');
  matches.addMatch('pencilman', 'brogan20', 'miibrawler', 'kirby');
  matches.addMatch('pencilman', 'Shinks', 'donkeykong', 'zelda');
  matches.addMatch('RobotWizard', 'Shinks', 'shulk', 'sheik');
  matches.addMatch('pencilman', 'Shinks', 'gameandwatch', 'zelda');
  matches.addMatch('pencilman', 'RobotWizard', 'miibrawler', 'luigi');
  matches.addMatch('brogan20', 'Shinks', 'bowser', 'zelda');
  matches.addMatch('brogan20', 'pencilman', 'rosalinaandluma', 'donkeykong');
  matches.addMatch('Shinks', 'pencilman', 'zelda', 'gameandwatch');
  matches.addMatch('pencilman', 'RobotWizard', 'donkeykong', 'shulk');
  matches.addMatch('pencilman', 'RobotWizard', 'donkeykong', 'luigi');
  matches.addMatch('pencilman', 'brogan20', 'miibrawler', 'bowser');
  matches.addMatch('RobotWizard', 'Shinks', 'shulk', 'sheik');
  matches.addMatch('brogan20', 'RobotWizard', 'bowser', 'shulk'); */
}

exports = module.exports = { runSetup };