const express = require('express');
const getComment = require('../db/getSingleCommentDocumentById');
const router = express.Router();


router.get('/:id/:id1/:id2/:id3', async function (req, res) {
    const id = req.params.id
    const id1 = req.params.id1
    const id2 = req.params.id2
    const id3 = req.params.id3
    const comment = await getComment(id,id1,id2,id3)
    if(!comment) res.status(404).send('It doesnt exist')
    res.send(comment);
    
});
module.exports = router;