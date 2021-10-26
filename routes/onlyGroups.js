const express = require('express');
const router = express.Router();
const getGroups= require('../db/getGroupsWithoutPosts');

router.get('/:id', async function (req, res) {
    const id = req.params.id
    let full = await getGroups(id)
    if(!full) res.status(404).send('It doesnt exist')
    res.send(full)
})
module.exports = router;