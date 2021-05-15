const express = require('express');
const router = express.Router();
const data = require('../data');
const charData = data.characters
const matchData = data.matches;
const tournamentData = data.tournaments
const userData = data.users;
const xss = require('xss');


router.get('/', async (req, res) => {
    try {
        var matches = await matchData.getAllMatches();
    } catch (e) {
        res.render('others/404error', {pageTitle: "404", username: xss(req.session.user), error: "Matches not found"});
        return;
    }

    for(const elem of matches){
        elem.winnerPlayedDisplay = charData.charNameMap[elem.winnerPlayed]
        elem.loserPlayedDisplay = charData.charNameMap[elem.loserPlayed]
        try{
            let temp = await tournamentData.findMatchTournament(elem._id.toString());
            elem.tourney = temp ? temp : undefined
        } catch(e){

        }
    }
    res.render('others/allmatches', {pageTitle: "All Matches", username: xss(req.session.user), matches: matches});
});

router.get('/:id', async (req, res) => {
    try {
        var match = await matchData.getMatch(req.params.id);
    } catch (e) {
        res.render('others/404error', {pageTitle: "404", username: xss(req.session.user), error: `Match ${xss(req.params.id)} not found`});
        return;
    }
    match.winnerPlayedDisplay = charData.charNameMap[match.winnerPlayed];
    match.loserPlayedDisplay = charData.charNameMap[match.loserPlayed];
    res.render('others/match', {pageTitle: `Match: ${match.winner} vs. ${match.loser}`, username: xss(req.session.user), match: match});
});

router.post('/', async (req, res) => {
    let matchInfo = xss(req.body);
    let winner;
    let loser;
    if (!matchInfo) {
        res.json({comment: "Match info not supplied"});
        return;
    }
    if (!xss(matchInfo.winner) || typeof xss(matchInfo.winner) != 'string') {
        res.json({comment: "Winner not supplied"});
        return;
    }
    try{
        winner = await userData.getOneUser(xss(matchInfo.winner));
    } catch(e){
        res.json({comment: "Winner is not in our database"});
        return;
    }
    if (!xss(matchInfo.loser) || typeof xss(matchInfo.loser) != 'string') {
        res.render('others/400error', {pageTitle: "400", username: xss(req.session.user), error: "Loser not supplied"});
        res.json({comment: "Loser not supplied"});
        return;
    }
    try{
        loser = await userData.getOneUser(xss(matchInfo.loser));
    } catch(e){
        res.json({comment: "Loser is not in our database"});
        return;
    }
    if (!xss(matchInfo.winnerPlayed) || typeof xss(matchInfo.winnerPlayed) != 'string') {
        res.json({comment: "Character played by winner not supplied"});
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
    if (xss(req.session.user) !== winner.displayName && xss(req.session.user) !== loser.displayName){
        res.json({comment: "You can only report a match you played in"})
        return;
    }

    try {
        let winnerPlayed = charData.charNameMapReverse[matchInfo.winnerPlayed] ? charData.charNameMapReverse[matchInfo.winnerPlayed]: matchInfo.winnerPlayed
        let loserPlayed = charData.charNameMapReverse[matchInfo.loserPlayed] ? charData.charNameMapReverse[matchInfo.loserPlayed]: matchInfo.loserPlayed

        const match = await matchData.addMatch(winner.displayName, loser.displayName, winnerPlayed, loserPlayed)

        res.status(200).json({...match, winnerPlayedDisplay: charData.charNameMap[winnerPlayed], loserPlayedDisplay: charData.charNameMap[loserPlayed]});
    } catch (e) {
        console.log(e)
        res.json({comment: e})

    }
});

router.post('/:id', async (req, res) => {
    let commentInfo = xss(req.body);
    if (!commentInfo) {
        res.json({comment: "Comment info not supplied"})
        return;
    }
    if (!xss(req.session.user)) {
        res.json({comment: "Not Signed In"})
        return;
    }
    if (!commentInfo.comment || typeof commentInfo.comment != 'string') {
        res.json({comment: "Comment content not supplied"})
        return;
    }
    try {
        await matchData.addComment(xss(req.params.id), xss(req.session.user), commentInfo.comment);
        res.status(200).json({poster: xss(req.session.user), content: commentInfo.comment});
    } catch (e) {
        res.json({comment: "Failed to add comment"})

    }
});

module.exports = router;
