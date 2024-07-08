const router = require('express').Router();
const Post = require('../models/Post');
const ctrlWrapper = require('../helpers/ctrlWrapper');

router.get('/');

module.exports = router;
