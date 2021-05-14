const express = require('express');
const router = express.Router();
const data = require('../data');
const characterData = data.characters;
const matchData = data.matches;

router.get('/', async (req, res) =>{
    try {
        var characters = await characterData.getAllChar();
    } catch (e) {
        res.render('others/404error', {pageTitle: "404", error: "Characters not found"});
        return;
    }
    res.render('others/allcharacters', {pageTitle: "Character Profiles", characters: characters});
});

router.get('/:id', async (req, res) => {
    let matches, character;
    try {
        character = await characterData.getOneChar(req.params.id);
    } catch (e) {
        res.render('others/404error', {pageTitle: "404", error: `Character '${req.params.id}' not found`});
        return;
    }
    character.image = `${req.params.id}.png`;
    try {
        matches = await matchData.getMatchesByCharName(req.params.id);
    } catch (e) {
        res.render('others/404error', {pageTitle: "404", error: `Could not find matches for character '${req.params.id}'`});
        return;
    }
    console.log(matches);
    res.render('others/character', {pageTitle: `Character: ${character.displayName}`, character: character, matches: matches});
});

module.exports = router;
