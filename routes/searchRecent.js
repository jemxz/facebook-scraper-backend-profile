const express = require('express');
const serachItem = require('../db/searchRecent');
const router = express.Router();



router.get('/:id', async function (req, res) {
    const id1 = req.params.id
    const result = await serachItem(id1)
    if(!result) res.status(404).send('It doesnt exist')
    res.send(result);
    
});
module.exports = router;