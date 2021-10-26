const express = require('express');
const router = express.Router();
const getDate= require('../db/getDates');

router.get('/', async function (req, res) {
    let date = await getDate()
    if(!date) res.status(404).send('It doesnt exist')
    res.send(date)
})
module.exports = router;