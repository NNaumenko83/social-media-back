const router = require('express').Router();
const Post = require('../models/Post');
const User = require('../models/User');
const { ctrlWrapper, HttpError } = require('../helpers');

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
            await post.deleteOne();
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
router.put(
    '/:id/like',
    ctrlWrapper(async (req, res) => {
        const post = await Post.findById(req.params.id);
        if (!post) {
            throw HttpError(404, 'Post not found');
        }
        if (!post.likes.includes(req.body.userId)) {
            post.likes.push(req.body.userId);
            await post.save();
            res.status(200).json({
                status: 'Success',
                code: 200,
                message: 'The post has been liked successfully',
            });
        } else {
            await post.updateOne({ $pull: { likes: req.body.userId } });
            res.status(200).json({
                status: 'Success',
                code: 200,
                message: 'The post has been disliked successfully',
            });
        }
    }),
);
// get a post

router.get(
    '/:id',
    ctrlWrapper(async (req, res) => {
        const post = await Post.findById(req.params.id);
        if (!post) {
            throw HttpError(404, 'Post not found');
        }

        res.status(200).json({
            status: 'success',
            code: 200,
            data: post,
        });
    }),
);

// get timeline posts

router.get(
    '/timeline/:userId',
    ctrlWrapper(async (req, res) => {
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({ userId: currentUser._id });
        const friendPost = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Post.find({ userId: friendId });
            }),
        );

        res.status(200).json({
            status: 'success',
            code: 200,
            data: userPosts.concat(...friendPost),
        });
    }),
);

// get user's all posts

router.get(
    '/profile/:username',
    ctrlWrapper(async (req, res) => {
        const user = await User.findOne({ username: req.params.username });
        console.log('user:', user);
        const posts = await Post.find({ userId: user._id });

        res.status(200).json({
            status: 'success',
            code: 200,
            data: posts,
        });
    }),
);

module.exports = router;
