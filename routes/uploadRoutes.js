const express = require("express");
const router = express.Router();
const fs = require('fs');
const db = require("../models");
const bodyParser = require("body-parser");
const shortid = require('shortid');
const cloudinary = require('cloudinary');
// Multer Configurations
const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
// Check File Type
// function checkFileType(file, cb) {
//     // Allowed ext
//     const filetypes = /jpeg|jpg|png|gif/;
//     // Check ext
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//     // Check mime
//     const mimetype = filetypes.test(file.mimetype);

//     if (mimetype && extname) {
//         return cb(null, true);
//     } else {
//         cb('Error: Images Only!');
//     }
// }
const upload = multer({
    storage: storage
    // fileFilter: function (req, file, cb) {
    //     checkFileType(file, cb);
    // }
});

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_cloud_name,
    api_key: process.env.CLOUDINARY_api_key,
    api_secret: process.env.CLOUDINARY_api_secret
});

// Upload a new post
router.post('/upload', upload.single('image'), async function (req, res) {
    // console.log(req.body, req.files);
    console.log("req.file.path: ", req.file.path);
    if (!req.file.path) {
        console.log(req.file.path);
        throw new Error(`
        Route: POST /upload | req.file.path is undefined.
        Please ensure that you have uploaded a file.
        `);
    }

    // Create the new Image
    var newImage = new db.Image({
        slug: shortid.generate(),
        title: '',
        description: '',
        views: 0
    });
    await newImage.save();

    // Create the new Post
    var newPost = new db.Post({
        slug: shortid.generate(),
        title: '',
        description: '',
        views: 0,
        // $push: { images: newImage },
    });
    newPost.images.push(newImage);
    await newPost.save();

    console.log("newImage.slug: " + String(newImage.slug));

    cloudinary.v2.uploader.upload(req.file.path, { public_id: String(newImage.slug) }, function (error, result) {
        console.log(result);
        res.json({
            postSlug: newPost.slug
        });
        // res.redirect('/a/' + newPost.slug);
        fs.unlink(req.file.path);
    });
});

// Add an image to a post
router.post('/a/:postSlug/addImageToPost', upload.single('image'), async function (req, res) {
    // Create the new Image
    var newImage = new db.Image({
        slug: shortid.generate(),
        title: '',
        description: '',
        views: 0
    });
    await newImage.save();

    // Update the Post, that is, add image to the post
    await db.Post.findOneAndUpdate(
        { slug: req.params.postSlug },
        {
            $push: { images: newImage },
        }
    );

    cloudinary.v2.uploader.upload(req.file.path, { public_id: String(newImage.slug) }, function (error, result) {
        console.log(result);
        // http://res.cloudinary.com/imoko/image/upload/SyGi2MVuM.png
        res.json({
            imgSlug: String(newImage.slug),
            imgURL: "//res.cloudinary.com/imoko/image/upload/" + String(newImage.slug),
            imgDesc: newImage.description
        });
        fs.unlink(req.file.path);
    });
});

router.get('/test', function (req, res) {
    res.render('testUpload');
})

router.post('/test', upload.single('image'), function (req, res) {
    console.log(req.file);
    res.json({
        imgSlug: "HJLjH04uM",
        imgURL: "//res.cloudinary.com/imoko/image/upload/HJLjH04uM",
        imgDesc: ""
    });
    // fs.unlink(req.file.path);
})

module.exports = router;