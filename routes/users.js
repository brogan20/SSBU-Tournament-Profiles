const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;
const charData = data.characters;

router.get('/', async (req, res) => {
    try {
        var users = await userData.getAllUsers();
    } catch (e) {
        res.render('others/404error', {pageTitle: "404", error: "Users not found"});
        return;
    }
    res.render('others/allusers', {pageTitle: "User Profiles", users: users});
});

router.get('/:id', async (req, res) => {
    try {
        var user = await userData.getOneUser(req.params.id);
    } catch (e) {
        res.render('others/404error', {pageTitle: "404", error: `User ${req.params.id} not found`});
        return;
    }

    let wins = 0;
    let losses = 0;
    let rival = {displayName: "This user has not played anyone", wins: 0, losses: 0}
    for(const elem in user.userPlayed){
        wins += user.userPlayed[elem][0];
        losses += user.userPlayed[elem][1];
        if(user.userPlayed[elem][0] + user.userPlayed[elem][1] > rival.wins + rival.losses){
            rival.displayName = elem;
            rival.wins = user.userPlayed[elem][0];
            rival.losses = user.userPlayed[elem][1];
        }
        user.userPlayed[elem][2] = (Math.round(user.userPlayed[elem][0] / (user.userPlayed[elem][0] + user.userPlayed[elem][1]) * 1000) / 10).toFixed(2);
    }
    let mostPlayed;
    let numgames = 0;
    for(const elem in user.charPlayed){
        user.charPlayed[elem][2] = (Math.round(user.charPlayed[elem][0] / (user.charPlayed[elem][0] + user.charPlayed[elem][1]) * 1000) / 10).toFixed(2);
        user.charPlayed[elem][3] = charData.charNameMap[elem];
        if (numgames < user.charPlayed[elem][0] + user.charPlayed[elem][1]) {
            numgames =user.charPlayed[elem][0] + user.charPlayed[elem][1];
            mostPlayed = charData.charNameMap[elem];
        }
    }


    res.render('others/user', {pageTitle: user.displayName, mostPlayed: mostPlayed, user: user, wins: wins, losses: losses, rival: rival});
});

router.post('/', async (req, res) => {
    let userInfo = req.body;
    if (!userInfo) {
        res.render('others/400error', {pageTitle: "400", error: "User info not supplied"});
        return;
    }
    if (!userInfo.displayName || typeof userInfo.display !== 'string') {
        res.render('others/400error', {pageTitle: "400", error: "Username not supplied"});
        return;
    }
    if (!userInfo.hashedPassword || typeof userInfo.hashedPassword !== 'string') {
        res.render('others/400error', {pageTitle: "400", error: "Password not supplied"});
        return;
    }

    try {
        const user = await userData.addUser(userInfo.displayName, userInfo.hashedPassword);
        res.status(200).json(user);
    } catch(e) {
        res.render('others/400error', {pageTitle: "400", error: "Failed to add user"});
        return;
    }
});

module.exports = router;
