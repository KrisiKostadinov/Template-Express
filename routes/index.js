const express = require('express');
const mls = require('../config/mls');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { title: 'Template Express' });
});

router.get('/about', mls.auth, (req, res) => {
    res.render('about', { title: 'about', loaded: 'about' });
});

module.exports = router;