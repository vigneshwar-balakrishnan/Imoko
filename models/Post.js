const mongoose = require('mongoose');

var postSchema = mongoose.Schema({
    slug: {
        type: String,
        required: [true, "can't be blank"],
        index: true
    },
    title: { type: String },
    // description: {
    //     type: String,
    // },
    images: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
    }],
    // comments: [{}],
    views: { type: Number }

}, { timestamps: true });

var Post = mongoose.model('Post', postSchema);

module.exports = Post;