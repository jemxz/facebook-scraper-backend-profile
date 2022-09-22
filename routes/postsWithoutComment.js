const express = require('express');
const router = express.Router();
const getGroups= require('../db/getPostWithoutComment');

router.get('/', async function (req, res) {
    let full = await getGroups()
    if(!full) res.status(404).send('It doesnt exist')
    res.send(full)
})

module.exports = router;