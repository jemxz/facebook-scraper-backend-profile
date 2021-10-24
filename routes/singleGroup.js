const express = require('express');
const getGroup = require('../db/getSingleGroupDocumentById');
const router = express.Router();


router.get('/:id/:id1', async function (req, res) {
    const id = req.params.id
    const id1 = req.params.id1
    const group = await getGroup(id,id1)
    if(!group) res.status(404).send('It doesnt exist')
    res.send(group);
    
});
module.exports = router;