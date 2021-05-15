const express = require('express');
const router = express.Router();
const data = require('../data');
const characterData = data.characters;
const matchData = data.matches;
const xss = require('xss');

router.get('/', async (req, res) =>{
    try {
        var characters = await characterData.getAllChar();
    } catch (e) {
        res.render('others/404error', {pageTitle: "404", error: "Characters not found"});
        return;
    }
    res.render('others/allcharacters', {pageTitle: "Character Profiles", username: xss(req.session.user), characters: characters});
});

router.get('/:id', async (req, res) => {
    let matches, character;
    try {
        character = await characterData.getOneChar(xss(req.params.id));
    } catch (e) {
        res.render('others/404error', {pageTitle: "404", username: xss(req.session.user), error: `Character '${xss(req.params.id)}' not found`});
        return;
    }
    character.image = `${xss(req.params.id)}.png`;
    try {
        matches = await matchData.getMatchesByCharName(xss(req.params.id));
    } catch (e) {
        res.render('others/404error', {pageTitle: "404", username: xss(req.session.user), error: `Could not find matches for character '${xss(req.params.id)}'`});
        return;
    }

    //Counts wins and losses to be displayed
    let wins = 0;
    let losses = 0;
    for(const elem of matches){
        if(elem.winnerPlayed === xss(req.params.id)){
            wins += 1;
        }
        else{
            losses += 1;
        }
        elem.winnerPlayedDisplay = characterData.charNameMap[elem.winnerPlayed];
        elem.loserPlayedDisplay = characterData.charNameMap[elem.loserPlayed];
    }

    res.render('others/character', {pageTitle: `Character: ${character.displayName}`, username: xss(req.session.user), character: character, matches: matches, wins: wins, losses: losses});
});

module.exports = router;
