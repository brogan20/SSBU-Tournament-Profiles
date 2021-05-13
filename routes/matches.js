const express = require('express');
const router = express.Router();
const data = require('../data');
const matchData = data.matches;

router.get('/', async (req, res) => {
    try {
        var matches = await matchData.getAllMatches();
    } catch (e) {
        res.render('others/404error', {pageTitle: "404", error: "Matches not found"});
        return;
    }
    res.render('others/allmatches', {pageTitle: "Match Profiles", matches: matches});
});

router.get('/:id', async (req, res) => {
    try {
        var match = await matchData.getOneMatch(req.params.id);
    } catch (e) {
        res.render('others/404error', {pageTitle: "404", error: `Match ${req.params.id} not found`});
        return;
    }
    res.render('others/match', {pageTitle: `Match: ${match.winner} vs. ${match.loser}`, match: match});
});

router.post(':/id', async (req, res) => {
    let matchInfo = req.body;
    if (!matchInfo) {
        res.render('others/400error', {pageTitle: "400", error: "Match info not supplied"});
        return;
    }
    if (!matchInfo.winner || typeof matchInfo.winner != 'string') {
        res.render('others/400error', {pageTitle: "400", error: "Winner not supplied"});
        return;
    }
    if (!matchInfo.loser || typeof matchInfo.loser != 'string') {
        res.render('others/400error', {pageTitle: "400", error: "Loser not supplied"});
        return;
    }
    if (!matchInfo.winnerPlayed || typeof matchInfo.winnerPlayed != 'string') {
        res.render('others/400error', {pageTitle: "400", error: "Character played by winner not supplied"});
        return;
    }
    if (!matchInfo.loserPlayed || typeof matchInfo.loserPlayed != 'string') {
        res.render('others/400error', {pageTitle: "400", error: "Character played by loser not supplied"});
        return;
    }

    try {
        const match = await matchData.addMatch(matchInfo.winner, matchInfo.loser, matchInfo.winnerPlayed, matchInfo.loserPlayed);
        res.status(200).json(match);
    } catch(e) {
        res.render('others/400error', {pageTitle: "400", error: "Failed to add match"});
        return;
    }
});

module.exports = router;
