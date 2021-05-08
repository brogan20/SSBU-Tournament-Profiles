const express = require('express');
const router = express.Router();

router.get('/', async (req, res) =>{
    res.render('others/allcharacters', {pageTitle: "Character Profiles", characters: [{id: 1, name: "isabelle"}, {id: 5, name: "mario"}]})
});

router.get('/:id', async (req, res) => {
    res.render('others/character', {pageTitle: req.params.id, characterid: req.params.id})
})

module.exports = router;