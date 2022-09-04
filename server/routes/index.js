const express = require('express');
const router = express.Router();


router.get('/personal', function (req, res, next) {
    res.send(req.query)
})

router.post('/favorite', function (req, res, next) {
    res.send(req.body)
    req.app.io.emit('message', {'text': '收到惹'})
})


module.exports = router;
