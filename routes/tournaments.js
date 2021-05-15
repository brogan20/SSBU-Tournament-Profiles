const express = require('express');
const router = express.Router();
const data = require('../data');
const tournamentData = data.tournaments;
const matchData = data.matches
const charData = data.characters

router.get('/', async (req, res) => {
    try {
        var tournaments = await tournamentData.getAllTournaments();
    } catch (e) {
        res.render('others/404error', {pageTitle: "404", error: "Tournaments not found"});
        return;
    }
    res.render('others/alltournaments', {pageTitle: "Tournament Profiles", tournaments: tournaments});
});

router.get('/:id', async (req, res) => {
    try {
        var tournament = await tournamentData.getOneTournament(req.params.id);
    } catch (e) {
        res.render('others/404error', {pageTitle: "404", error: `Tournament ${req.params.id} not found`});
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
        catch{
            continue;
        }
    }

    for(const elem in mostPlayed){
        users[elem][3] = Object.entries(mostPlayed[elem]).sort((a,b) => b[1] - a[1]).slice(0,3);
    }
    for(const elem in users){
        users[elem][2] =  (Math.round(users[elem][0]/( users[elem][0] +  users[elem][1]) * 1000) / 10).toFixed(2);
    }

    users = Object.entries(users).sort((a,b) => b[1][0] - a[1][0]);
    res.render('others/tournament', {pageTitle: `Tournament: ${tournament.name}`, tournament: tournament, users: users, matches: matches});
});

router.post('/', async (req, res) => {
    let tournamentInfo = req.body;
    if (!tournamentInfo) {
        res.render('others/400error', {pageTitle: "400", error: "Tournament info not supplied"});
        return;
    }
    if (!tournamentInfo.matches || !Arrays.isArray(tournamentInfo.matches)) {
        res.render('others/400error', {pageTitle: "400", error: "Tournament matches not supplied"});
        return;
    }
    if (!tournamentInfo.players || !Arrays.isArray(tournamentInfo.players)) {
        res.render('others/400error', {pageTitle: "400", error: "Tournament players not supplied"});
        return;
    }

    try {
        const tournament = await tournamentData.getTournament(tournamentInfo.matches, tournamentInfo.players);
        res.status(200).json(tournament);
    } catch (e) {
        res.render('others/400error', {pageTitle: "400", error: "Failed to add tournament"});
        return;
    }
});

module.exports = router;
