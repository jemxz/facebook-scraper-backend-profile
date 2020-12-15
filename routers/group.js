const express = require('express');
const router = express.Router();
const getGroupCollection = require('../db/getGroupsCollection');

router.get('/', async function (req, res) {
    let posts = await getGroupCollection()
    res.send(posts)
})
// router.get()

module.exports = router;