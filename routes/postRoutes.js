var express = require("express");
var router = express.Router();
const db = require("../models");

router.get('/', function name(req, res) {
    // nothing 
});

router.get('/a/:postSlug', async function name(req, res) {
    var post = await db.Post.findOne({ slug: req.params.postSlug })
        .populate('images')
        .exec();
    
    res.render('post', {post});
    // res.json(post);
});


module.exports = router;