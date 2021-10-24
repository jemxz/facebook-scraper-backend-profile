const express = require('express');
const getComment = require('../db/getAllCommentsOfAPost');
const router = express.Router();


router.get('/:id/:id1/:id2', async function (req, res) {
    const id = req.params.id
    const id1 = req.params.id1
    const id2 = req.params.id2
    const comments = await getComment(id,id1,id2)
    if(!comments) res.status(404).send('It doesnt exist')
    res.send(comments);
    
});
module.exports = router;