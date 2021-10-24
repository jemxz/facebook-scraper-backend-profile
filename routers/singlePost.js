const express = require('express');
const router = express.Router();
const getPost = require('../db/getSinglePostDocumentById');

router.get('/:id/:id1/:id2', async function (req, res) {
    const id = req.params.id
    const id1 = req.params.id1
    const id2 = req.params.id2
    let post = await getPost(id,id1,id2)
    if(!post) res.status(404).send('It doesnt exist')
    res.send(post)
})


module.exports = router;