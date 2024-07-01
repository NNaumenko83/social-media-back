const router = require('express').Router();
const User = require('../models/User');
const ctrlWrapper = require('../helpers/ctrlWrapper');
const bcrypt = require('bcrypt');

// REGISTER
router.post(
    '/register',
    ctrlWrapper(async (req, res) => {
        // Hash password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        console.log('hashedPassword:', hashedPassword);

        // Create new user
        const user = new User({ ...req.body, password: hashedPassword });

        // Save user to database
        await user.save();

        res.status(201).json('User registered successfully');
    }),
);

// LOGIN
router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return res.status(401).json('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
        return res.status(401).json('Invalid email or password');
    }

    res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
    });
});

module.exports = router;
