const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;

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
    res.render('others/user', {pageTitle: `User: ${user.displayName}`, user: user});
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
