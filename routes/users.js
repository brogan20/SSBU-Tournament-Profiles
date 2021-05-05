const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) =>{
    res.render('others/allusers', {pageTitle: "User Profiles", users: [{id: 50, name: "dylan"}, {id: 16, name: "kurt"}]})
});

router.get('/:id', async (req, res) => {
    res.render('others/user', {pageTitle: req.params.id, userid: req.params.id})
})

module.exports = router;