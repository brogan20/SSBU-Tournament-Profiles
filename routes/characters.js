const express = require('express');
const router = express.Router();

router.get('/', async (req, res) =>{
    res.render('others/allcharacters', {pageTitle: "Character Profiles", characters: [{id: 8, name: "isabelle"}, {id: 5, name: "mario"}, {id:6, name: "fox"}]})
});

router.get('/:name', async (req, res) => {
    res.render('others/character', {pageTitle: req.params.id, characterid: req.params.id})
})

module.exports = router;