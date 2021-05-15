const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const userData = require('../data/users.js');
const path = require('path');


router.get('/',(req, res) => {
    res.render('others/login', {pageTitle: 'Login'});
});

router.post('/', async(req, res) =>{
    const {username, password} = req.body;
    try{
        var user = await userData.getOneUser(username);
    } catch(e){
        res.status(401).render('others/login', {pageTitle: 'Login', loginFail: true})
        return;
    }
    let match = bcrypt.compareSync(password, user.hashedPassword);
    if(match){
        req.session.user = user;
        res.render('others/landing', {pageTitle: 'SSBU Tournament Profiles', landing: true});
        return;
    } else{
        res.status(401).render('others/login', {pageTitle: 'Login', loginFail: true})
    }
})

router.get('/logout', async(req, res) => {
    req.session.destroy();
    res.send('Logged out')
})
module.exports = router