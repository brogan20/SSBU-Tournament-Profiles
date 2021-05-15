const express = require('express');
const router = express.Router();
const data = require('../data');
const tournamentData = data.tournaments;
const matchData = data.matches
const charData = data.characters
const userData = data.users
const xss = require('xss');


router.get('/', async (req, res) => {
    try {
        var tournaments = await tournamentData.getAllTournaments();
    } catch (e) {
        res.render('others/404error', {pageTitle: "404", username: xss(req.session.user), error: "Tournaments not found"});
        return;
    }
    res.render('others/alltournaments', {pageTitle: "Tournament Profiles", username: xss(req.session.user), tournaments: tournaments});
});

router.get('/:id', async (req, res) => {
    try {
        var tournament = await tournamentData.getOneTournament(xss(req.params.id));
    } catch (e) {
        res.render('others/404error', {pageTitle: "404", username: xss(req.session.user), error: `Tournament ${xss(req.params.id)} not found`});
        return;
    }

    let matches = [];
    let users = {};
    let mostPlayed = {};
    for(const elem of tournament.players){
        users[elem] = [0,0];
        mostPlayed[elem] = {};
    }
    for(const elem of tournament.matches){
        try{
            let match = await matchData.getMatch(elem.toString());
            match.winnerPlayedDisplay = charData.charNameMap[match.winnerPlayed]
            match.loserPlayedDisplay = charData.charNameMap[match.loserPlayed]
            users[match.winner][0] += 1;
            users[match.loser][1] += 1;
            mostPlayed[match.winner][match.winnerPlayed] = mostPlayed[match.winner].hasOwnProperty(match.winnerPlayed) ? mostPlayed[match.winner][match.winnerPlayed] += 1 : 1
            mostPlayed[match.loser][match.loserPlayed] = mostPlayed[match.loser].hasOwnProperty(match.loserPlayed) ? mostPlayed[match.loser][match.loserPlayed] += 1 : 1
            matches.push(match);
        }
        catch(e){

        }
    }

    for(const elem in mostPlayed){
        users[elem][3] = Object.entries(mostPlayed[elem]).sort((a,b) => b[1] - a[1]).slice(0,3);
    }
    for(const elem in users){
        users[elem][2] =  (Math.round(users[elem][0]/( users[elem][0] +  users[elem][1]) * 1000) / 10).toFixed(2);
    }

    users = Object.entries(users).sort((a,b) => b[1][0] - a[1][0]);
    res.render('others/tournament', {pageTitle: `Tournament: ${tournament.name}`, username: xss(req.session.user), tournament: tournament, users: users, matches: matches});
});

router.post('/:id', async (req, res) => {
    let matchInfo = req.body;
    let winner;
    let loser;
    if (!matchInfo) {
        res.json({comment: "Match info not supplied"})
        return;
    }
    if (!xss(matchInfo.winner) || typeof xss(matchInfo.winner) != 'string') {
        res.json({comment: "Winner not supplied"})
        return;
    }
    try{
        winner = await userData.getOneUser(xss(matchInfo.winner))
    } catch(e){
        res.json({comment: "Winner is not in our database"})
        return;
    }
    if (!xss(matchInfo.loser) || typeof xss(matchInfo.loser) != 'string') {
        res.render('others/400error', {pageTitle: "400", username: xss(req.session.user), error: "Loser not supplied"});
        res.json({comment: "Loser not supplied"})
        return;
    }
    try{
        loser = await userData.getOneUser(xss(matchInfo.loser))
    } catch(e){
        res.json({comment: "Loser is not in our database"})
        return;
    }
    if (!xss(matchInfo.winnerPlayed) || typeof xss(matchInfo.winnerPlayed) != 'string') {
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
    if (!xss(matchInfo.loserPlayed) || typeof xss(matchInfo.loserPlayed) != 'string') {
        res.json({comment: "Character played by loser not supplied"})
        return;
    }
    if (xss(req.session.user) !== xss(winner.displayName) && xss(req.session.user) !== xss(loser.displayName)){
        res.json({comment: "You can only report a match you played in"})
        return;
    }

    try {
        const tempTournament = await tournamentData.getOneTournament(req.params.id);
        if(!tempTournament.players.includes(winner.displayName) || !tempTournament.players.includes(loser.displayName)){
            res.json({comment: "One of the players is not in the tournament"})
            return;
        }
        let winnerPlayed = charData.charNameMapReverse[matchInfo.winnerPlayed] ? charData.charNameMapReverse[matchInfo.winnerPlayed]: matchInfo.winnerPlayed
        let loserPlayed = charData.charNameMapReverse[matchInfo.loserPlayed] ? charData.charNameMapReverse[matchInfo.loserPlayed]: matchInfo.loserPlayed

        const match = await matchData.addMatch(winner.displayName, loser.displayName, winnerPlayed, loserPlayed)
        await tournamentData.addMatchToTournament(tempTournament._id.toString(), match._id)

        res.status(200).json({...match, winnerPlayedDisplay: charData.charNameMap[winnerPlayed], loserPlayedDisplay: charData.charNameMap[loserPlayed]});
    } catch (e) {
        res.json({comment: e})

    }
});

module.exports = router;
