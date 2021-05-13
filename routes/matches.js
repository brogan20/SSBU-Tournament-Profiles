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

});

module.exports = router;
