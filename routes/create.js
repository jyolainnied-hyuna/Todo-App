const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', (req, res) =>
{

fs.writeFileSync('tasks.json');
res.send('file created');
});


module.exports = router;