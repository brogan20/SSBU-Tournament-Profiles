const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;
const charData = data.characters;
const xss = require('xss');

router.get('/', async (req, res) => {
    try {
        var users = await userData.getAllUsers();
    } catch (e) {
        res.render('others/404error', {pageTitle: "404", username: xss(req.session.user), error: "Users not found"});
        return;
    }
    res.render('others/allusers', {pageTitle: "User Profiles", username: xss(req.session.user), users: users});
});

router.get('/:id', async (req, res) => {
    try {
        var user = await userData.getOneUser(req.params.id);
    } catch (e) {
        res.render('others/404error', {pageTitle: "404", username: xss(req.session.user), error: `User ${xss(req.params.id)} not found`});
        return;
    }

    //Parameters needed to calculate overall winrate and to find the users "rival"
    let wins = 0;
    let losses = 0;
    let rival = {displayName: "This user has not played anyone", wins: 0, losses: 0}
    for(const elem in user.userPlayed){
        //For every user that they have played, add to the wins and losses count
        wins += user.userPlayed[elem][0];
        losses += user.userPlayed[elem][1];

        //If the user has played this person more often than their current rival, this person becomes the current rival
        if(user.userPlayed[elem][0] + user.userPlayed[elem][1] > rival.wins + rival.losses){
            rival.displayName = elem;
            rival.wins = user.userPlayed[elem][0];
            rival.losses = user.userPlayed[elem][1];
        }

        //Calculates the users winrate versus this person
        user.userPlayed[elem][2] = (Math.round(user.userPlayed[elem][0] / (user.userPlayed[elem][0] + user.userPlayed[elem][1]) * 1000) / 10).toFixed(2);
    }
    let mostPlayed = "none";
    let numgames = 0;
    //Calculates winrates for each character they play
    for(const elem in user.charPlayed){
        //user.charPlayed is of the form [wins, losses, winrate, displayName]
        user.charPlayed[elem][2] = (Math.round(user.charPlayed[elem][0] / (user.charPlayed[elem][0] + user.charPlayed[elem][1]) * 1000) / 10).toFixed(2);
        user.charPlayed[elem][3] = charData.charNameMap[elem];

        //Same logic as the rival, but is used to find the character they played the most
        if (numgames < user.charPlayed[elem][0] + user.charPlayed[elem][1]) {
            numgames =user.charPlayed[elem][0] + user.charPlayed[elem][1];
            mostPlayed = elem;
        }
    }
    res.render('others/user', {pageTitle: `User: ${user.displayName}`, username: xss(req.session.user), mostPlayed: mostPlayed, user: user, wins: wins, losses: losses, rival: rival});
});

router.post('/', async (req, res) => {
    let userInfo = req.body;
    if (!userInfo) {
        res.render('others/400error', {pageTitle: "400", username: xss(req.session.user), error: "User info not supplied"});
        return;
    }
    if (!xss(userInfo.displayName) || typeof xss(userInfo.display) !== 'string') {
        res.render('others/400error', {pageTitle: "400", username: xss(req.session.user), error: "Username not supplied"});
        return;
    }
    if (!xss(userInfo.hashedPassword) || typeof xss(userInfo.hashedPassword) !== 'string') {
        res.render('others/400error', {pageTitle: "400", username: xss(req.session.user), error: "Password not supplied"});
        return;
    }

    try {
        const user = await userData.addUser(xss(userInfo.displayName), xss(userInfo.hashedPassword));
        res.status(200).json(user);
    } catch(e) {
        res.render('others/400error', {pageTitle: "400", username: xss(req.session.user), error: "Failed to add user"});

    }
});

module.exports = router;
