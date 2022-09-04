const express = require('express');
const router = express.Router();


//R - read
router.get('/students', (req, res, next) => {
    //query('sql',(err,result))
    req.app.dbConnect.query('SELECT * FROM students', (err, result) => {
        if (err) res.status(500).json({message: 'Server Error!'})
        else res.status(200).json({data: result})
    })
})

//C - create
router.post('/students', (req, res, next) => {
    const studentsData = req.body
    req.app.dbConnect.query(
        "INSERT INTO students(name,age,email,deparment) VALUES(?,?,?,?)"
        , [studentsData.name, studentsData.age, studentsData['email'], studentsData['deparment']]
        , (err, result) => {
            if (err) res.status(400).json({message: 'Insert Error!'})
            else res.status(201).send('Insert Successfully!')
        }
    )
})


//U -update

router.patch('/students/:id', (req, res, next) => {
    const studentsID = req.params.id
    req.app.dbConnect.query('UPDATE students set age=? where id=?', [req.body.age, studentsID], (err, result) => {
        if (err) res.status(400).json({message: 'Updated Error!'})
        else res.status(200).send('Updated Successfully!')
    })
})

//D - delete

router.delete('/students/:id', (req, res, next) => {
    const studentsID = req.params.id
    req.app.dbConnect.query('DELETE FROM students where id=?', [studentsID], (err, result) => {
        if (err) res.status(400).json({message: 'Delete Error!'})
        else res.status(204).send('Delete Successfully!')
    })
})


module.exports = router