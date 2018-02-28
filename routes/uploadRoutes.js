const express = require("express");
const router = express.Router();
const cloudinary = require('cloudinary');

const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

const shortid = require('shortid');
const bodyParser = require("body-parser");
const db = require("../models");


// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_cloud_name,
    api_key: process.env.CLOUDINARY_api_key,
    api_secret: process.env.CLOUDINARY_api_secret
});

router.post('/upload', multipartMiddleware, async function (req, res) {
    // console.log(req.body, req.files);
    
    // Create the new Image
    var newImage = new db.Image({
        slug: shortid.generate(),
        title: '',
        description: ''
    });
    await newImage.save();

    // Create the new Post
    var newPost = new db.Post({
        slug: shortid.generate(),
        title: '',
        description: '',
        $push: { images: newImage },
    });
    await newPost.save();
    
    console.log("newImage.slug: " + String(newImage.slug));

    cloudinary.v2.uploader.upload(req.files.image.path, {public_id: String(newImage.slug)}, function (error, result) {
        console.log("RESULT: ");
        console.log(result);
        res.json(result);
    });
});


module.exports = router;