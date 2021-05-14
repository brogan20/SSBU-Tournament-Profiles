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

  await matches.addMatch('pencilman', 'Shinks', 'donkeykong', 'isabelle');
  await matches.addMatch('RobotWizard', 'Shinks', 'kirby', 'sheik');
  await matches.addMatch('RobotWizard', 'brogan20', 'shulk', 'bowser');
  await matches.addMatch('Shinks', 'RobotWizard', 'isabelle', 'shulk');
  await matches.addMatch('RobotWizard', 'Shinks', 'kirby', 'sheik');
  await matches.addMatch('RobotWizard', 'pencilman', 'shulk', 'mrgameandwatch');
  await matches.addMatch('RobotWizard', 'pencilman', 'shulk', 'miibrawler');
  await matches.addMatch('RobotWizard', 'Shinks', 'luigi', 'sheik');
  await matches.addMatch('RobotWizard', 'pencilman', 'luigi', 'miibrawler');
  await matches.addMatch('Shinks', 'brogan20', 'zelda', 'rosalinaandluma');
  await matches.addMatch('RobotWizard', 'pencilman', 'shulk', 'miibrawler');
  await matches.addMatch('brogan20', 'RobotWizard', 'kirby', 'shulk');
  await matches.addMatch('Shinks', 'RobotWizard', 'isabelle', 'shulk');
  await matches.addMatch('brogan20', 'pencilman', 'rosalinaandluma', 'mrgameandwatch');
  await matches.addMatch('brogan20', 'Shinks', 'bowser', 'sheik');
  await matches.addMatch('brogan20', 'RobotWizard', 'rosalinaandluma', 'shulk');
  await matches.addMatch('brogan20', 'pencilman', 'kirby', 'mrgameandwatch');
  await matches.addMatch('RobotWizard', 'pencilman', 'shulk', 'mrgameandwatch');
  await matches.addMatch('Shinks', 'brogan20', 'sheik', 'kirby');
  await matches.addMatch('Shinks', 'brogan20', 'isabelle', 'kirby');
  await matches.addMatch('RobotWizard', 'brogan20', 'luigi', 'rosalinaandluma');
  await matches.addMatch('brogan20', 'RobotWizard', 'kirby', 'shulk');
  await matches.addMatch('RobotWizard', 'Shinks', 'luigi', 'zelda');
  await matches.addMatch('RobotWizard', 'brogan20', 'kirby', 'rosalinaandluma');
  await matches.addMatch('Shinks', 'brogan20', 'sheik', 'kirby');
  await matches.addMatch('brogan20', 'RobotWizard', 'kirby', 'kirby');
  await matches.addMatch('Shinks', 'brogan20', 'isabelle', 'rosalinaandluma');
  await matches.addMatch('brogan20', 'RobotWizard', 'bowser', 'luigi');
  await matches.addMatch('pencilman', 'brogan20', 'miibrawler', 'bowser');
  await matches.addMatch('Shinks', 'RobotWizard', 'zelda', 'luigi');
  await matches.addMatch('RobotWizard', 'Shinks', 'luigi', 'isabelle');
  await matches.addMatch('Shinks', 'RobotWizard', 'isabelle', 'luigi');
  await matches.addMatch('brogan20', 'RobotWizard', 'rosalinaandluma', 'luigi');
  await matches.addMatch('pencilman', 'RobotWizard', 'miibrawler', 'kirby');
  await matches.addMatch('RobotWizard', 'brogan20', 'luigi', 'rosalinaandluma');
  await matches.addMatch('pencilman', 'RobotWizard', 'miibrawler', 'luigi');
  await matches.addMatch('brogan20', 'pencilman', 'rosalinaandluma', 'miibrawler');
  await matches.addMatch('brogan20', 'RobotWizard', 'bowser', 'shulk');
  await matches.addMatch('brogan20', 'pencilman', 'kirby', 'donkeykong');
  await matches.addMatch('Shinks', 'RobotWizard', 'zelda', 'luigi');
  await matches.addMatch('brogan20', 'RobotWizard', 'rosalinaandluma', 'shulk');
  await matches.addMatch('brogan20', 'RobotWizard', 'bowser', 'shulk');
  await matches.addMatch('Shinks', 'RobotWizard', 'zelda', 'luigi');
  await matches.addMatch('pencilman', 'brogan20', 'mrgameandwatch', 'kirby');
  await matches.addMatch('Shinks', 'brogan20', 'isabelle', 'rosalinaandluma');
  await matches.addMatch('brogan20', 'Shinks', 'rosalinaandluma', 'sheik');
  await matches.addMatch('Shinks', 'RobotWizard', 'isabelle', 'luigi');
  await matches.addMatch('pencilman', 'RobotWizard', 'miibrawler', 'luigi');
  await matches.addMatch('Shinks', 'RobotWizard', 'isabelle', 'shulk');
  await matches.addMatch('Shinks', 'RobotWizard', 'sheik', 'kirby');
  await matches.addMatch('pencilman', 'RobotWizard', 'miibrawler', 'shulk');
  await matches.addMatch('brogan20', 'pencilman', 'bowser', 'donkeykong');
  await matches.addMatch('brogan20', 'pencilman', 'rosalinaandluma', 'donkeykong');
  await matches.addMatch('brogan20', 'Shinks', 'bowser', 'zelda');
  await matches.addMatch('Shinks', 'brogan20', 'sheik', 'rosalinaandluma');
  await matches.addMatch('brogan20', 'Shinks', 'rosalinaandluma', 'sheik');
  await matches.addMatch('brogan20', 'RobotWizard', 'rosalinaandluma', 'kirby');
  await matches.addMatch('pencilman', 'Shinks', 'donkeykong', 'sheik');
  await matches.addMatch('pencilman', 'RobotWizard', 'miibrawler', 'shulk');
  await matches.addMatch('Shinks', 'RobotWizard', 'zelda', 'luigi');
  await matches.addMatch('RobotWizard', 'brogan20', 'luigi', 'bowser');
  await matches.addMatch('brogan20', 'pencilman', 'rosalinaandluma', 'donkeykong');
  await matches.addMatch('brogan20', 'RobotWizard', 'kirby', 'kirby');
  await matches.addMatch('pencilman', 'brogan20', 'donkeykong', 'bowser');
  await matches.addMatch('brogan20', 'Shinks', 'bowser', 'sheik');
  await matches.addMatch('pencilman', 'brogan20', 'mrgameandwatch', 'bowser');
  await matches.addMatch('pencilman', 'RobotWizard', 'donkeykong', 'shulk');
  await matches.addMatch('pencilman', 'Shinks', 'donkeykong', 'zelda');
  await matches.addMatch('pencilman', 'brogan20', 'donkeykong', 'bowser');
  await matches.addMatch('brogan20', 'pencilman', 'bowser', 'miibrawler');
  await matches.addMatch('RobotWizard', 'Shinks', 'luigi', 'zelda');
  await matches.addMatch('RobotWizard', 'pencilman', 'shulk', 'mrgameandwatch');
  await matches.addMatch('brogan20', 'RobotWizard', 'kirby', 'shulk');
  await matches.addMatch('RobotWizard', 'Shinks', 'kirby', 'isabelle');
  await matches.addMatch('RobotWizard', 'brogan20', 'shulk', 'kirby');
  await matches.addMatch('RobotWizard', 'brogan20', 'luigi', 'kirby');
  await matches.addMatch('brogan20', 'pencilman', 'kirby', 'miibrawler');
  await matches.addMatch('brogan20', 'pencilman', 'kirby', 'donkeykong');
  await matches.addMatch('pencilman', 'Shinks', 'miibrawler', 'isabelle');
  await matches.addMatch('pencilman', 'RobotWizard', 'miibrawler', 'kirby');
  await matches.addMatch('brogan20', 'RobotWizard', 'kirby', 'shulk');
  await matches.addMatch('pencilman', 'RobotWizard', 'donkeykong', 'luigi');
  await matches.addMatch('RobotWizard', 'brogan20', 'kirby', 'bowser');
  await matches.addMatch('pencilman', 'Shinks', 'donkeykong', 'isabelle');
  await matches.addMatch('brogan20', 'pencilman', 'bowser', 'miibrawler');
  await matches.addMatch('Shinks', 'brogan20', 'sheik', 'bowser');
  await matches.addMatch('pencilman', 'RobotWizard', 'donkeykong', 'shulk');
  await matches.addMatch('Shinks', 'pencilman', 'sheik', 'donkeykong');
  await matches.addMatch('Shinks', 'RobotWizard', 'zelda', 'luigi');
  await matches.addMatch('Shinks', 'brogan20', 'sheik', 'bowser');
  await matches.addMatch('pencilman', 'RobotWizard', 'donkeykong', 'kirby');
  await matches.addMatch('brogan20', 'pencilman', 'rosalinaandluma', 'donkeykong');
  await matches.addMatch('Shinks', 'brogan20', 'zelda', 'rosalinaandluma');
  await matches.addMatch('brogan20', 'pencilman', 'rosalinaandluma', 'mrgameandwatch');
  await matches.addMatch('pencilman', 'Shinks', 'donkeykong', 'zelda');
  await matches.addMatch('brogan20', 'Shinks', 'rosalinaandluma', 'zelda');
  await matches.addMatch('RobotWizard', 'pencilman', 'shulk', 'miibrawler');
  await matches.addMatch('brogan20', 'Shinks', 'bowser', 'zelda');
  await matches.addMatch('Shinks', 'pencilman', 'zelda', 'donkeykong');
  await matches.addMatch('brogan20', 'Shinks', 'rosalinaandluma', 'isabelle');
}

exports = module.exports = { runSetup };