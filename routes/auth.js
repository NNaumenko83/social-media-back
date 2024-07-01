const router = require('express').Router();
const User = require('../models/User');

// REGISTER
router.post('/register', async (req, res) => {
    const user = await User.create(req.body);

    res.status(201).json('register success');
});

module.exports = router;
