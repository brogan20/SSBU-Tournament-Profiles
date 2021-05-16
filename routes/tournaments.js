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

    //Information that we need to calculate for the handlebars, mostPlayed will be the characters each user
    //played the most in the tournament
    //matches: array of match db entries
    //users: object that makes user display names to array of the form [numWins, numLosses, winRate, [3 most played characters]]
    let matches = [];
    let users = {};
    let mostPlayed = {};
    for(const elem of tournament.players){
        //Initializes the object
        users[elem] = [0,0];
        mostPlayed[elem] = {};
    }
    for(const elem of tournament.matches){
        try{
            //Goes through every match and adds the appropriate data
            let match = await matchData.getMatch(elem.toString());

            //Sets the display name of the characters, for the handlebars
            match.winnerPlayedDisplay = charData.charNameMap[match.winnerPlayed]
            match.loserPlayedDisplay = charData.charNameMap[match.loserPlayed]

            //Adds to the win or lose count of the relevant users
            users[match.winner][0] += 1;
            users[match.loser][1] += 1;

            //Adds to the mostPlayed object so we can determine who they have played the most later
            mostPlayed[match.winner][match.winnerPlayed] = mostPlayed[match.winner].hasOwnProperty(match.winnerPlayed) ? mostPlayed[match.winner][match.winnerPlayed] += 1 : 1
            mostPlayed[match.loser][match.loserPlayed] = mostPlayed[match.loser].hasOwnProperty(match.loserPlayed) ? mostPlayed[match.loser][match.loserPlayed] += 1 : 1
            matches.push(match);
        }
        catch(e){

        }
    }

    for(const elem in mostPlayed){
        //Goes through every user and finds the 3 characters they played the most
        users[elem][3] = Object.entries(mostPlayed[elem]).sort((a,b) => b[1] - a[1]).slice(0,3);
    }
    for(const elem in users){
        //Takes the wins and losses and calculates the winrate for each user
        users[elem][2] =  (Math.round(users[elem][0]/( users[elem][0] +  users[elem][1]) * 1000) / 10).toFixed(2);
    }

    users = Object.entries(users).sort((a,b) => b[1][0] - a[1][0]);
    res.render('others/tournament', {pageTitle: `Tournament: ${tournament.name}`, username: xss(req.session.user), tournament: tournament, users: users, matches: matches});
});

router.post('/:id', async (req, res) => {
    //Adds a match to a given tournament
    let matchInfo = req.body;
    let winner;
    let loser;

    //Checks parameters
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
        //Finds the tournament that the match will be added to (the ID is in the url)
        const tempTournament = await tournamentData.getOneTournament(req.params.id);

        //Checks if both players were playing in the tournament
        if(!tempTournament.players.includes(winner.displayName) || !tempTournament.players.includes(loser.displayName)){
            res.json({comment: "One of the players is not in the tournament"})
            return;
        }

        //Makes sure that the character names are abbreviated
        let winnerPlayed = charData.charNameMapReverse[matchInfo.winnerPlayed] ? charData.charNameMapReverse[matchInfo.winnerPlayed]: matchInfo.winnerPlayed
        let loserPlayed = charData.charNameMapReverse[matchInfo.loserPlayed] ? charData.charNameMapReverse[matchInfo.loserPlayed]: matchInfo.loserPlayed

        //Adds the match and adds to the tournament
        const match = await matchData.addMatch(winner.displayName, loser.displayName, winnerPlayed, loserPlayed)
        await tournamentData.addMatchToTournament(tempTournament._id.toString(), match._id)

        res.status(200).json({...match, winnerPlayedDisplay: charData.charNameMap[winnerPlayed], loserPlayedDisplay: charData.charNameMap[loserPlayed]});
    } catch (e) {
        res.json({comment: e})

    }
});

module.exports = router;
