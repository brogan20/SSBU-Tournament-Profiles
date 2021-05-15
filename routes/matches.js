const express = require('express');
const router = express.Router();
const data = require('../data');
const charData = data.characters
const matchData = data.matches;
const tournamentData = data.tournaments

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
        try{
            let temp = await tournamentData.findMatchTournament(elem._id.toString());
            elem.tourney = temp ? temp : undefined
        } catch(e){
            continue;
        }
    }
    res.render('others/allmatches', {pageTitle: "All Matches", matches: matches});
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
        res.json({comment: "Match info not supplied"})
        return;
    }
    if (!matchInfo.winner || typeof matchInfo.winner != 'string') {
        res.json({comment: "Winner not supplied"})
        return;
    }
    if (!matchInfo.loser || typeof matchInfo.loser != 'string') {
        res.render('others/400error', {pageTitle: "400", error: "Loser not supplied"});
        res.json({comment: "Loser not supplied"})
        return;
    }
    if (!matchInfo.winnerPlayed || typeof matchInfo.winnerPlayed != 'string') {
        res.json({comment: "Character played by winner not supplied"})
        return;
    }
    if (!charData.charNameMapReverse[matchInfo.winnerPlayed] && !charData.charNameMap[matchInfo.winnerPlayed]){
        res.json({comment: "Character played by winner does not exist"})
        return;
    }
    if (!charData.charNameMapReverse[matchInfo.loserPlayed] && !charData.charNameMap[matchInfo.loserPlayed]){
        res.json({comment: "Character played by loser does not exist"})
        return;
    }
    if (!matchInfo.loserPlayed || typeof matchInfo.loserPlayed != 'string') {
        res.json({comment: "Character played by loser not supplied"})
        return;
    }

    try {
        let winnerPlayed = charData.charNameMapReverse[matchInfo.winnerPlayed] ? charData.charNameMapReverse[matchInfo.winnerPlayed]: matchInfo.winnerPlayed
        let loserPlayed = charData.charNameMapReverse[matchInfo.loserPlayed] ? charData.charNameMapReverse[matchInfo.loserPlayed]: matchInfo.loserPlayed

        const match = await matchData.addMatch(matchInfo.winner, matchInfo.loser, winnerPlayed, loserPlayed)

        res.status(200).json({...match, winnerPlayedDisplay: charData.charNameMap[winnerPlayed], loserPlayedDisplay: charData.charNameMap[loserPlayed]});
    } catch (e) {
        res.json({comment: e})
        return;
    }
});

router.post('/:id', async (req, res) => {
    let commentInfo = req.body;
    if (!commentInfo) {
        res.json({comment: "Comment info not supplied"})
        return;
    }
    if (!commentInfo.poster || typeof commentInfo.poster != 'string') {
        res.json({comment: "Comment poster not supplied"})
        return;
    }
    if (!commentInfo.comment || typeof commentInfo.comment != 'string') {
        res.json({comment: "Comment content not supplied"})
        return;
    }

    try {
        const comment = await matchData.addComment(req.params.id, commentInfo.poster, commentInfo.comment);
        res.status(200).json({poster: commentInfo.poster, content: commentInfo.comment});
    } catch (e) {
        res.json({comment: "Failed to add comment"})
        return;
    }
});

module.exports = router;
