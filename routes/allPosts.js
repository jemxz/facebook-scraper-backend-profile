const express = require('express');
const getComment = require('../db/getAllPostsOfAGroup');
const router = express.Router();


router.get('/:id/:id1', async function (req, res) {
    const id = req.params.id
    const id1 = req.params.id1
    const posts = await getComment(id,id1)
    if(!posts) res.status(404).send('It doesnt exist')
    res.send(posts);
    
});
module.exports = router;