const router = require('express').Router();
const User = require('../models/User');

// REGISTER
router.post('/register', async (req, res) => {
    const user = await User.create({
        username: 'John',
        email: 'john@example.com',
        password: '123456',
    });

    res.status(201).json('register success');
});

module.exports = router;
