const express = require('express');
const router = express.Router();
const getGroupsCollection = require('../db/getGroupsCollection');

router.get('/:id', async function (req, res) {
    const id = req.params.id
    let group = await getGroupsCollection(id)
    if(!group) res.status(404).send('It doesnt exist')
    res.send(group)
})
// router.get()

module.exports = router;