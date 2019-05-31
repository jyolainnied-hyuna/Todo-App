const express = require('express');
const router = express.Router();

//render page
router.post('/', (req, res) =>
{
    res.sendFile('index.html');
});

module.exports = router;