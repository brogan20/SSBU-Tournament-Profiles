const express = require('express');
const router = express.Router();
const data = require('../data');
const tournamentData = data.tournaments;

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
    res.render('others/tournament', {pageTitle: `Tournament: ${req.params.id}`, tournament: tournament});
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
