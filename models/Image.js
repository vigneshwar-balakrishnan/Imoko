const mongoose = require('mongoose');

var imageSchema = mongoose.Schema({
    slug: {
        type: String,
        required: [true, "can't be blank"],
        index: true
    },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    // comments: [{}],
    views: {
        type: Number
    }

}, { timestamps: true });

var Image = mongoose.model('Image', imageSchema);

module.exports = Image;