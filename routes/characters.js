const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) =>{
    res.render('others/allcharacters', {pageTitle: "Character Profiles"})
});

router.get('/:id', async (req, res) => {
    res.render('others/character', {pageTitle: req.params.id, characterid: req.params.id})
})

module.exports = router;