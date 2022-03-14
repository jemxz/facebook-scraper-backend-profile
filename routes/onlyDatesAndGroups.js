const express = require('express');
const router = express.Router();
const getGroupsAndDates= require('../db/getDatesAndGroupsWithoutPosts');

router.get('/', async function (req, res) {
    let full = await getGroupsAndDates()
    if(!full) res.status(404).send('It doesnt exist')
    res.send(full)
})

module.exports = router;