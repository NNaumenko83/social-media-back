const { ctrlWrapper, HttpError } = require('../helpers');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = require('express').Router();

// update user
router.put(
    '/:id',
    ctrlWrapper(async (req, res, next) => {
        console.log('req:', req.body);
        if (req.body.userId === req.params.id || req.body.isAdmin) {
            if (req.body.password) {
                req.body.password = await bcrypt.hash(req.body.password, 10);
            }

            const user = await User.findByIdAndUpdate(
                req.body.userId,
                {
                    $set: req.body,
                },
                {
                    new: true,
                },
            );

            res.status(200).json({
                status: 'success',
                code: 200,
                message: 'Account has been updated successfully',
            });
        } else {
            throw HttpError(403, 'You can update only your account');
        }
    }),
);

// delete user
router.delete(
    '/:id',
    ctrlWrapper(async (req, res, next) => {
        console.log('req:', req.body);
        if (req.body.userId === req.params.id || req.body.isAdmin) {
            const user = await User.findByIdAndDelete(req.body.userId);

            res.status(200).json({
                status: 'success',
                code: 200,
                message: 'Account has been deleted successfully',
            });
        } else {
            console.log('else:');
            throw HttpError(403, 'You can delete only your account');
        }
    }),
);

// get a user

router.get(
    '/:id',
    ctrlWrapper(async (req, res, next) => {
        const user = await User.findById(req.params.id);
        if (!user) {
            throw HttpError(404, 'User not found');
        }

        console.log('user._doc:', user._doc);
        const { password, updatedAt, createdAt, ...other } = user._doc;
        res.status(200).json({
            status: 'success',
            code: 200,
            data: other,
        });
    }),
);

// follow a user

// unfollow a user

module.exports = router;
