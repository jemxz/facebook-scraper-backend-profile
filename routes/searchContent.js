const express = require('express');
const serachItem = require('../db/search');
const router = express.Router();



router.get('/:id/:q', async function (req, res) {
    const id1 = req.params.id
    const id2 = req.query.q
    const result = await serachItem(id1,id2)
    if(!result) res.status(404).send('It doesnt exist')
    res.send(result);
    
});
module.exports = router;