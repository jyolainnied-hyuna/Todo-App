const express = require('express');
const router = express.Router();

router.get('/', (req, res) =>
{
    var message = "This is a message";
    res.render('index',{title: 'My Express App', message: 'Hello'});
});


module.exports = router;