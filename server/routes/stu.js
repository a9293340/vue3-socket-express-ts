const express = require('express');
const router = express.Router();




router.get('/', (req, res) => {
    req.app.studentsCollection.find().toArray().then(result => {
        res.json(result)
    }).catch(e => {
        console.log(e)
    })
})







module.exports = router
