const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { title: 'Template Express' });
});

router.get('/about', (req, res) => {
    res.render('about', { title: 'about', loaded: 'about' });
});

module.exports = router;