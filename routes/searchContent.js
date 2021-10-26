const express = require('express');
const serachItem = require('../db/search');
const router = express.Router();



router.get('/:q', async function (req, res) {
    const id = req.query.q
    const result = await serachItem(id)
    if(!result) res.status(404).send('It doesnt exist')
    res.send(result);
    
});
module.exports = router;