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
  ["Mii Swordfighter","miiswordfighter"],
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

  let tourney1 = await tournaments.addTournament('Tournament1', ['RobotWizard', "Shinks", "pencilman", "brogan20", "DoctorFlopper", "TheRock1211", "lempie", "p0ptartlov3r"])
  let tourney2 = await tournaments.addTournament('Tournament2 (missing lempie)', ['RobotWizard', "Shinks", "pencilman", "brogan20", "DoctorFlopper", "TheRock1211", "p0ptartlov3r"])
  let tourney3 = await tournaments.addTournament('Tournament3', ['RobotWizard', "Shinks", "pencilman", "brogan20", "DoctorFlopper", "TheRock1211", "lempie", "p0ptartlov3r"])
  await users.addUser('RobotWizard', 'Password1');
  await users.addUser('Shinks', 'Password2');
  await users.addUser('brogan20', 'Password3');
  await users.addUser('pencilman', 'Password4');
  await users.addUser('DoctorFlopper', 'Password5');
  await users.addUser('TheRock1211', 'Password6');
  await users.addUser('lempie', 'Password7');
  await users.addUser('p0ptartlov3r', 'Password8');

  //TOURNAMENT 1
  await matches.addMatch('pencilman', 'DoctorFlopper', 'donkeykong', 'mario').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('pencilman', 'TheRock1211', 'miibrawler', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('RobotWizard', 'brogan20', 'kirby', 'kirby').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('p0ptartlov3r', 'DoctorFlopper', 'hero', 'mario').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'p0ptartlov3r', 'darkpit', 'hero').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('pencilman', 'brogan20', 'incineroar', 'kirby').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('brogan20', 'Shinks', 'bowser', 'younglink').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('pencilman', 'p0ptartlov3r', 'mrgameandwatch', 'kingkrool').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('pencilman', 'p0ptartlov3r', 'donkeykong', 'hero').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'DoctorFlopper', 'darkpit', 'mario').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'p0ptartlov3r', 'link', 'hero').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('DoctorFlopper', 'brogan20', 'littlemac', 'bowser').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'p0ptartlov3r', 'darkpit', 'hero').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('brogan20', 'TheRock1211', 'rosalinaandluma', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('DoctorFlopper', 'TheRock1211', 'littlemac', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('lempie', 'DoctorFlopper', 'fox', 'littlemac').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('DoctorFlopper', 'TheRock1211', 'littlemac', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('pencilman', 'DoctorFlopper', 'mrgameandwatch', 'littlemac').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('p0ptartlov3r', 'brogan20', 'pyramythra', 'bowser').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('pencilman', 'p0ptartlov3r', 'mrgameandwatch', 'joker').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('lempie', 'pencilman', 'hero', 'donkeykong').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('lempie', 'brogan20', 'hero', 'bowser').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('RobotWizard', 'brogan20', 'kirby', 'bowser').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('lempie', 'DoctorFlopper', 'fox', 'littlemac').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('RobotWizard', 'brogan20', 'kirby', 'rosalinaandluma').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('lempie', 'RobotWizard', 'fox', 'luigi').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('lempie', 'RobotWizard', 'fox', 'kirby').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('p0ptartlov3r', 'Shinks', 'joker', 'samus').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('brogan20', 'RobotWizard', 'rosalinaandluma', 'kirby').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'TheRock1211', 'miiswordfighter', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('lempie', 'Shinks', 'hero', 'link').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('p0ptartlov3r', 'brogan20', 'joker', 'kirby').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('lempie', 'pencilman', 'hero', 'miibrawler').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('DoctorFlopper', 'TheRock1211', 'littlemac', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('pencilman', 'brogan20', 'mrgameandwatch', 'rosalinaandluma').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('p0ptartlov3r', 'DoctorFlopper', 'joker', 'mario').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('DoctorFlopper', 'TheRock1211', 'mario', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'DoctorFlopper', 'drmario', 'mario').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'pencilman', 'miigunner', 'mrgameandwatch').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'RobotWizard', 'marth', 'kirby').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('lempie', 'TheRock1211', 'hero', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('lempie', 'pencilman', 'fox', 'incineroar').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('lempie', 'p0ptartlov3r', 'pikachu', 'hero').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('lempie', 'TheRock1211', 'hero', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('RobotWizard', 'brogan20', 'luigi', 'rosalinaandluma').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('lempie', 'brogan20', 'hero', 'kirby').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('DoctorFlopper', 'TheRock1211', 'littlemac', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'TheRock1211', 'drmario', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('lempie', 'pencilman', 'hero', 'mrgameandwatch').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('lempie', 'pencilman', 'pikachu', 'mrgameandwatch').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('DoctorFlopper', 'p0ptartlov3r', 'mario', 'pyramythra').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('lempie', 'DoctorFlopper', 'hero', 'littlemac').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('RobotWizard', 'pencilman', 'luigi', 'incineroar').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('DoctorFlopper', 'brogan20', 'littlemac', 'kirby').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('DoctorFlopper', 'pencilman', 'mario', 'miibrawler').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('pencilman', 'TheRock1211', 'incineroar', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('lempie', 'DoctorFlopper', 'pikachu', 'mario').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'DoctorFlopper', 'darkpit', 'littlemac').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'DoctorFlopper', 'marth', 'mario').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('lempie', 'Shinks', 'pikachu', 'zelda').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('p0ptartlov3r', 'DoctorFlopper', 'pyramythra', 'littlemac').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('pencilman', 'DoctorFlopper', 'donkeykong', 'littlemac').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('pencilman', 'brogan20', 'miibrawler', 'rosalinaandluma').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('lempie', 'pencilman', 'pikachu', 'donkeykong').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('lempie', 'TheRock1211', 'fox', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('DoctorFlopper', 'TheRock1211', 'mario', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('RobotWizard', 'TheRock1211', 'kirby', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('DoctorFlopper', 'brogan20', 'littlemac', 'kirby').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('lempie', 'RobotWizard', 'pikachu', 'kirby').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('DoctorFlopper', 'brogan20', 'littlemac', 'kirby').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'RobotWizard', 'isabelle', 'kirby').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('pencilman', 'DoctorFlopper', 'incineroar', 'mario').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('brogan20', 'TheRock1211', 'rosalinaandluma', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('p0ptartlov3r', 'TheRock1211', 'hero', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('lempie', 'Shinks', 'pikachu', 'zelda').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('RobotWizard', 'brogan20', 'kirby', 'kirby').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('RobotWizard', 'TheRock1211', 'luigi', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('RobotWizard', 'TheRock1211', 'kirby', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('DoctorFlopper', 'TheRock1211', 'mario', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('DoctorFlopper', 'pencilman', 'littlemac', 'miibrawler').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('lempie', 'TheRock1211', 'hero', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('pencilman', 'brogan20', 'mrgameandwatch', 'bowser').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('p0ptartlov3r', 'RobotWizard', 'pyramythra', 'kirby').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('pencilman', 'DoctorFlopper', 'incineroar', 'mario').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('RobotWizard', 'DoctorFlopper', 'kirby', 'mario').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('DoctorFlopper', 'brogan20', 'mario', 'kirby').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('p0ptartlov3r', 'DoctorFlopper', 'hero', 'mario').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('pencilman', 'brogan20', 'donkeykong', 'kirby').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('RobotWizard', 'Shinks', 'kirby', 'miiswordfighter').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('DoctorFlopper', 'brogan20', 'littlemac', 'kirby').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('brogan20', 'TheRock1211', 'bowser', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('DoctorFlopper', 'TheRock1211', 'littlemac', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('RobotWizard', 'p0ptartlov3r', 'luigi', 'hero').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('lempie', 'brogan20', 'fox', 'rosalinaandluma').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'pencilman', 'banjoandkazooie', 'donkeykong').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('pencilman', 'p0ptartlov3r', 'mrgameandwatch', 'hero').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('p0ptartlov3r', 'pencilman', 'hero', 'miibrawler').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('pencilman', 'TheRock1211', 'mrgameandwatch', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('brogan20', 'p0ptartlov3r', 'bowser', 'joker').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));
  await matches.addMatch('lempie', 'brogan20', 'fox', 'rosalinaandluma').then((temp) => tournaments.addMatchToTournament(tourney1._id.toString(), temp._id));

  //TOURNAMENT 2
  await matches.addMatch('DoctorFlopper', 'p0ptartlov3r', 'littlemac', 'pyramythra').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('pencilman', 'brogan20', 'incineroar', 'rosalinaandluma').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('brogan20', 'TheRock1211', 'kirby', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'brogan20', 'donkeykong', 'bowser').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('DoctorFlopper', 'TheRock1211', 'mario', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('p0ptartlov3r', 'RobotWizard', 'hero', 'luigi').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('RobotWizard', 'TheRock1211', 'kirby', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('p0ptartlov3r', 'Shinks', 'kingkrool', 'link').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('RobotWizard', 'TheRock1211', 'kirby', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'TheRock1211', 'peach', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('DoctorFlopper', 'pencilman', 'mario', 'miibrawler').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('RobotWizard', 'pencilman', 'luigi', 'miibrawler').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('pencilman', 'RobotWizard', 'donkeykong', 'luigi').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'p0ptartlov3r', 'duckhunt', 'kingkrool').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'RobotWizard', 'palutena', 'luigi').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('RobotWizard', 'brogan20', 'luigi', 'bowser').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('DoctorFlopper', 'brogan20', 'littlemac', 'rosalinaandluma').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'brogan20', 'sheik', 'bowser').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('RobotWizard', 'brogan20', 'luigi', 'kirby').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('DoctorFlopper', 'RobotWizard', 'littlemac', 'kirby').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('DoctorFlopper', 'pencilman', 'mario', 'donkeykong').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('p0ptartlov3r', 'TheRock1211', 'hero', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'p0ptartlov3r', 'palutena', 'hero').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('DoctorFlopper', 'brogan20', 'mario', 'kirby').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('DoctorFlopper', 'brogan20', 'mario', 'kirby').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('DoctorFlopper', 'TheRock1211', 'mario', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('DoctorFlopper', 'p0ptartlov3r', 'mario', 'joker').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'pencilman', 'samus', 'donkeykong').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('p0ptartlov3r', 'RobotWizard', 'pyramythra', 'luigi').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('p0ptartlov3r', 'TheRock1211', 'pyramythra', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('p0ptartlov3r', 'TheRock1211', 'joker', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('DoctorFlopper', 'pencilman', 'littlemac', 'donkeykong').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'TheRock1211', 'zelda', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('RobotWizard', 'DoctorFlopper', 'luigi', 'mario').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('pencilman', 'TheRock1211', 'donkeykong', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('brogan20', 'pencilman', 'bowser', 'incineroar').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'TheRock1211', 'darkpit', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'RobotWizard', 'marth', 'luigi').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'RobotWizard', 'isabelle', 'kirby').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('RobotWizard', 'DoctorFlopper', 'kirby', 'mario').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('DoctorFlopper', 'p0ptartlov3r', 'littlemac', 'hero').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'pencilman', 'miigunner', 'donkeykong').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'pencilman', 'darkpit', 'miibrawler').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('brogan20', 'TheRock1211', 'bowser', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('pencilman', 'TheRock1211', 'donkeykong', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('DoctorFlopper', 'Shinks', 'littlemac', 'marth').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'TheRock1211', 'darkpit', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'p0ptartlov3r', 'peach', 'joker').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'TheRock1211', 'darkpit', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('pencilman', 'p0ptartlov3r', 'mrgameandwatch', 'kingkrool').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'p0ptartlov3r', 'palutena', 'joker').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'TheRock1211', 'peach', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('RobotWizard', 'pencilman', 'luigi', 'mrgameandwatch').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('RobotWizard', 'pencilman', 'kirby', 'mrgameandwatch').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'DoctorFlopper', 'link', 'mario').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('RobotWizard', 'DoctorFlopper', 'luigi', 'mario').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('DoctorFlopper', 'p0ptartlov3r', 'littlemac', 'hero').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('RobotWizard', 'DoctorFlopper', 'kirby', 'mario').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('RobotWizard', 'TheRock1211', 'luigi', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('p0ptartlov3r', 'pencilman', 'kingkrool', 'mrgameandwatch').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('brogan20', 'TheRock1211', 'bowser', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('brogan20', 'pencilman', 'bowser', 'incineroar').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('pencilman', 'TheRock1211', 'donkeykong', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('RobotWizard', 'pencilman', 'kirby', 'miibrawler').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('brogan20', 'pencilman', 'kirby', 'incineroar').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('RobotWizard', 'pencilman', 'luigi', 'miibrawler').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('brogan20', 'p0ptartlov3r', 'rosalinaandluma', 'pyramythra').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('p0ptartlov3r', 'RobotWizard', 'hero', 'kirby').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'p0ptartlov3r', 'link', 'pyramythra').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'TheRock1211', 'miiswordfighter', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('DoctorFlopper', 'RobotWizard', 'littlemac', 'luigi').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('brogan20', 'pencilman', 'rosalinaandluma', 'mrgameandwatch').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('DoctorFlopper', 'brogan20', 'mario', 'rosalinaandluma').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'TheRock1211', 'isabelle', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'brogan20', 'banjoandkazooie', 'kirby').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('RobotWizard', 'pencilman', 'luigi', 'donkeykong').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('pencilman', 'TheRock1211', 'mrgameandwatch', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('p0ptartlov3r', 'TheRock1211', 'joker', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('DoctorFlopper', 'TheRock1211', 'mario', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'DoctorFlopper', 'palutena', 'mario').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('pencilman', 'brogan20', 'miibrawler', 'rosalinaandluma').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('RobotWizard', 'brogan20', 'luigi', 'bowser').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('brogan20', 'TheRock1211', 'kirby', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'brogan20', 'banjoandkazooie', 'kirby').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('p0ptartlov3r', 'DoctorFlopper', 'joker', 'littlemac').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('RobotWizard', 'p0ptartlov3r', 'luigi', 'kingkrool').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'TheRock1211', 'samus', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('brogan20', 'TheRock1211', 'bowser', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('DoctorFlopper', 'TheRock1211', 'littlemac', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'TheRock1211', 'zelda', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('RobotWizard', 'brogan20', 'luigi', 'bowser').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('RobotWizard', 'TheRock1211', 'luigi', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('pencilman', 'TheRock1211', 'miibrawler', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('DoctorFlopper', 'pencilman', 'mario', 'mrgameandwatch').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'pencilman', 'drmario', 'incineroar').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'p0ptartlov3r', 'marth', 'pyramythra').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('DoctorFlopper', 'TheRock1211', 'mario', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('pencilman', 'TheRock1211', 'incineroar', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('DoctorFlopper', 'brogan20', 'littlemac', 'kirby').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));
  await matches.addMatch('DoctorFlopper', 'pencilman', 'littlemac', 'miibrawler').then((temp) => tournaments.addMatchToTournament(tourney2._id.toString(), temp._id));

  //TOURNAMENT 3
  await matches.addMatch('lempie', 'brogan20', 'fox', 'rosalinaandluma').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('lempie', 'pencilman', 'fox', 'donkeykong').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('RobotWizard', 'pencilman', 'kirby', 'incineroar').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('lempie', 'Shinks', 'pikachu', 'miigunner').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'p0ptartlov3r', 'link', 'hero').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('DoctorFlopper', 'TheRock1211', 'littlemac', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('RobotWizard', 'brogan20', 'kirby', 'kirby').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('DoctorFlopper', 'TheRock1211', 'littlemac', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('RobotWizard', 'brogan20', 'luigi', 'kirby').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('RobotWizard', 'TheRock1211', 'luigi', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('RobotWizard', 'TheRock1211', 'kirby', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('DoctorFlopper', 'p0ptartlov3r', 'littlemac', 'hero').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'DoctorFlopper', 'miiswordfighter', 'mario').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('lempie', 'DoctorFlopper', 'pikachu', 'mario').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('p0ptartlov3r', 'pencilman', 'joker', 'donkeykong').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('p0ptartlov3r', 'Shinks', 'hero', 'younglink').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('pencilman', 'DoctorFlopper', 'incineroar', 'mario').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('DoctorFlopper', 'brogan20', 'littlemac', 'bowser').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('RobotWizard', 'DoctorFlopper', 'kirby', 'littlemac').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('p0ptartlov3r', 'RobotWizard', 'hero', 'kirby').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('brogan20', 'pencilman', 'rosalinaandluma', 'donkeykong').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('pencilman', 'brogan20', 'donkeykong', 'bowser').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('p0ptartlov3r', 'brogan20', 'kingkrool', 'rosalinaandluma').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('lempie', 'p0ptartlov3r', 'pikachu', 'pyramythra').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('pencilman', 'TheRock1211', 'mrgameandwatch', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('lempie', 'RobotWizard', 'hero', 'kirby').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('p0ptartlov3r', 'pencilman', 'hero', 'mrgameandwatch').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('DoctorFlopper', 'brogan20', 'mario', 'rosalinaandluma').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('RobotWizard', 'brogan20', 'kirby', 'rosalinaandluma').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('lempie', 'DoctorFlopper', 'pikachu', 'littlemac').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'p0ptartlov3r', 'palutena', 'hero').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'TheRock1211', 'younglink', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('RobotWizard', 'pencilman', 'kirby', 'mrgameandwatch').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('lempie', 'p0ptartlov3r', 'hero', 'pyramythra').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('DoctorFlopper', 'brogan20', 'littlemac', 'rosalinaandluma').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('RobotWizard', 'TheRock1211', 'luigi', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('pencilman', 'RobotWizard', 'miibrawler', 'kirby').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('DoctorFlopper', 'brogan20', 'mario', 'rosalinaandluma').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('p0ptartlov3r', 'TheRock1211', 'kingkrool', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('RobotWizard', 'TheRock1211', 'luigi', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('TheRock1211', 'brogan20', 'piranhaplant', 'kirby').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('RobotWizard', 'Shinks', 'luigi', 'drmario').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('p0ptartlov3r', 'TheRock1211', 'pyramythra', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('RobotWizard', 'pencilman', 'kirby', 'mrgameandwatch').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('DoctorFlopper', 'TheRock1211', 'mario', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'TheRock1211', 'drmario', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('lempie', 'Shinks', 'pikachu', 'peach').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('lempie', 'DoctorFlopper', 'hero', 'mario').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('lempie', 'TheRock1211', 'pikachu', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('DoctorFlopper', 'brogan20', 'mario', 'kirby').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('lempie', 'RobotWizard', 'hero', 'kirby').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('lempie', 'p0ptartlov3r', 'pikachu', 'hero').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('lempie', 'brogan20', 'hero', 'bowser').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('RobotWizard', 'TheRock1211', 'kirby', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('lempie', 'Shinks', 'pikachu', 'younglink').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('lempie', 'Shinks', 'fox', 'miiswordfighter').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('lempie', 'Shinks', 'pikachu', 'darkpit').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('lempie', 'RobotWizard', 'hero', 'luigi').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('DoctorFlopper', 'brogan20', 'mario', 'kirby').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'RobotWizard', 'drmario', 'kirby').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('DoctorFlopper', 'brogan20', 'littlemac', 'rosalinaandluma').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('brogan20', 'TheRock1211', 'bowser', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('lempie', 'TheRock1211', 'hero', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'DoctorFlopper', 'duckhunt', 'littlemac').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('RobotWizard', 'brogan20', 'kirby', 'bowser').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('RobotWizard', 'Shinks', 'luigi', 'palutena').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('p0ptartlov3r', 'brogan20', 'pyramythra', 'rosalinaandluma').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'p0ptartlov3r', 'sheik', 'hero').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('pencilman', 'brogan20', 'mrgameandwatch', 'bowser').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'TheRock1211', 'drmario', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('lempie', 'DoctorFlopper', 'pikachu', 'littlemac').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('DoctorFlopper', 'brogan20', 'littlemac', 'kirby').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('lempie', 'pencilman', 'hero', 'mrgameandwatch').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('pencilman', 'brogan20', 'mrgameandwatch', 'kirby').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'brogan20', 'banjoandkazooie', 'rosalinaandluma').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('RobotWizard', 'DoctorFlopper', 'kirby', 'littlemac').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'RobotWizard', 'younglink', 'luigi').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('lempie', 'RobotWizard', 'fox', 'kirby').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('p0ptartlov3r', 'brogan20', 'hero', 'kirby').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('lempie', 'RobotWizard', 'fox', 'kirby').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('p0ptartlov3r', 'pencilman', 'joker', 'incineroar').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'p0ptartlov3r', 'duckhunt', 'pyramythra').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('p0ptartlov3r', 'RobotWizard', 'joker', 'kirby').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('lempie', 'brogan20', 'hero', 'rosalinaandluma').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('lempie', 'Shinks', 'hero', 'younglink').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'pencilman', 'isabelle', 'mrgameandwatch').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'p0ptartlov3r', 'donkeykong', 'kingkrool').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('RobotWizard', 'pencilman', 'luigi', 'donkeykong').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('pencilman', 'brogan20', 'mrgameandwatch', 'rosalinaandluma').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('brogan20', 'pencilman', 'bowser', 'mrgameandwatch').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('RobotWizard', 'lempie', 'luigi', 'hero').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('lempie', 'Shinks', 'fox', 'zelda').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'TheRock1211', 'sheik', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'RobotWizard', 'younglink', 'kirby').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('p0ptartlov3r', 'Shinks', 'kingkrool', 'banjoandkazooie').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'p0ptartlov3r', 'yoshi', 'hero').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('Shinks', 'p0ptartlov3r', 'marth', 'joker').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('pencilman', 'TheRock1211', 'incineroar', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('pencilman', 'TheRock1211', 'mrgameandwatch', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
  await matches.addMatch('pencilman', 'TheRock1211', 'incineroar', 'piranhaplant').then((temp) => tournaments.addMatchToTournament(tourney3._id.toString(), temp._id));
}

exports = module.exports = { runSetup };