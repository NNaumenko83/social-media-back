const router = require('express').Router();
const Post = require('../models/Post');
const ctrlWrapper = require('../helpers/ctrlWrapper');

// create a post
router.post(
    '/',
    ctrlWrapper(async (req, res) => {
        const newPost = await Post.create(req.body);

        res.status(201).json({
            status: 'success',
            code: 201,
            data: newPost,
        });
    }),
);
// update a post
router.put(
    '/:id',
    ctrlWrapper(async (req, res) => {
        const post = await Post.findById(req.params.id);
        if (!post) {
            throw HttpError(404, 'Post not found');
        }
        if (post.userId === req.body.userId) {
            const post = await Post.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true },
            );
            res.status(200).json({
                status: 'success',
                code: 200,
                data: post,
            });
        } else {
            throw HttpError(403, 'You can only update your own post');
        }
    }),
);

// delete a post
router.delete(
    '/:id',
    ctrlWrapper(async (req, res) => {
        const post = await Post.findById(req.params.id);
        if (!post) {
            throw HttpError(404, 'Post not found');
        }
        if (post.userId === req.body.userId) {
            await Post.findByIdAndDelete(req.params.id);
            res.status(200).json({
                status: 'success',
                code: 200,
                message: 'Post deleted successfully',
            });
        } else {
            throw HttpError(403, 'You can only delete your own post');
        }
    }),
);
// like a post
// get a post

router.get(
    '/',
    ctrlWrapper(async (req, res) => {
        const posts = await Post.find({});
        res.status(200).json({
            status: 'success',
            code: 200,
            data: posts,
        });
    }),
);

// get timeline posts

module.exports = router;
