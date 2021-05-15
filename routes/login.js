const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const userData = require('../data/users.js');
// const path = require('path');
const xss = require('xss');

//const saltRounds = 9;


router.get('/', async (req, res) => {
    if (xss(req.session.user)) {
        res.redirect("/")
    } else {
        if (xss(req.session.error)) {
            res.status(401).render('others/login', {pageTitle: 'Login', error: xss(req.session.error)});
        } else {
            res.render('others/login', {pageTitle: 'Login', error: xss(req.session.error)});
        }
    }
});

router.post('/', async (req, res) =>{
    const username = xss(req.body.username);
    const password = xss(req.body.password);

    try{
        var user = await userData.getOneUser(username);
    } catch(e){
        req.session.error = true;
        res.redirect('/login');
        return;
    }
    let match = await bcrypt.compare(password, xss(user.hashedPassword));
    if (match) {
        req.session.error = false;
        req.session.user = username;
        res.redirect('/');
    } else {
        req.session.error = true;
        res.redirect('/login');
    } 
});
    /*
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
}) */

router.get('/logout', async(req, res) => {
    req.session.destroy();
    res.redirect("/");
});

module.exports = router