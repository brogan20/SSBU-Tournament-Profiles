const express = require('express');
const router = express.Router();
const data = require('../data');
const charData = data.characters
const matchData = data.matches;
const commentData = data.comments;

router.get('/', async (req, res) => {
    try {
        var matches = await matchData.getAllMatches();
    } catch (e) {
        res.render('others/404error', {pageTitle: "404", error: "Matches not found"});
        return;
    }

    for(const elem of matches){
        elem.winnerPlayedDisplay = charData.charNameMap[elem.winnerPlayed]
        elem.loserPlayedDisplay = charData.charNameMap[elem.loserPlayed]
    }
    res.render('others/allmatches', {pageTitle: "Match Profiles", matches: matches});
});

router.get('/:id', async (req, res) => {
    try {
        var match = await matchData.getMatch(req.params.id);
    } catch (e) {
        res.render('others/404error', {pageTitle: "404", error: `Match ${req.params.id} not found`});
        return;
    }
    match.winnerPlayedDisplay = charData.charNameMap[match.winnerPlayed]
    match.loserPlayedDisplay = charData.charNameMap[match.loserPlayed]
    res.render('others/match', {pageTitle: `Match: ${match.winner} vs. ${match.loser}`, match: match});
});

router.post('/', async (req, res) => {
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

router.post('/:id', async (req, res) => {
    let commentInfo = req.body;
    if (!commentInfo) {
        res.render('others/400error', {pageTitle: "400", error: "Comment info not supplied"});
        return;
    }
    if (!commentInfo.poster || typeof commentInfo.poster !== 'string') {
        res.render('others/400error', {pageTitle: "400", error: "Comment poster not supplied"});
        return;
    }
    if (!commentInfo.comment || typeof commentInfo.comment !== 'string') {
        res.render('others/400error', {pageTitle: "400", error: "Comment content not suppied"});
        return;
    }

    try {
        const comment = await commentData.addComment(commentInfo.poster, commentInfo.comment);
        res.status(200).json(comment);
    } catch (e) {
        res.render('others/400error', {pageTitle: "400", error: "Failed to add comment"});
        return;
    }
});

module.exports = router;
