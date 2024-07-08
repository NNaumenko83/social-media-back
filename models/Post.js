const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
    {
        userId: { type: Stirng, required: true },
        desc: { type: 'string', /* required: true, */ max: 500 },
        img: { type: 'string' /* required: true */ },
        likes: { type: Array, default: [] },
    },
    { timestamps: true, versionKey: false },
);

module.exports = mongoose.model('Post', PostSchema);
