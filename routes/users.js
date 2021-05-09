const express = require('express');
const router = express.Router();

router.get('/', async (req, res) =>{
    res.render('others/allusers', {pageTitle: "User Profiles", users: [{id: 37, name: "paul"}, {id: 50, name: "dylan"}, {id: 16, name: "kurt"}]})
});

router.get('/:name', async (req, res) => {
    res.render('others/user', {pageTitle: req.params.id, userid: req.params.id})
})

module.exports = router;