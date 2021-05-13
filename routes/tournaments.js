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

router.post(':/id', async (req, res) => {

});

module.exports = router;
