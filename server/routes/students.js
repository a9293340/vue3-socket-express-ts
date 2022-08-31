const express = require('express');
const router = express.Router();
const dbConnect = require('../db/mysql')


//R - read
router.get('/', (req, res, next) => {
  //query('sql',(err,result))
  dbConnect.query('SELECT * FROM students', (err, result) => {
    if (err) throw err;


    res.json(result);
  })
})

//C - create
router.post('/', (req, res, next) => {

  dbConnect.query(
      "INSERT INTO students(name,age,email,deparment) VALUES(?,?,?,?)"
      , [req.body.name, req.body.age, req.body['email'], req.body['deparment']]
      ,(err,result) => {
        if(err) throw err;

        res.send('Insert Successfully!')
      }
  )
})


//U -update

router.patch('/',(req, res, next) => {
  dbConnect.query('UPDATE students set age=? where id=?',[req.body.age,req.body.id],(err,result)=>{
    if(err) throw err;

    res.send('Updated Successfully!')
  })
})

//D - delete

router.delete('/',(req,res,next) => {
  console.log(req.body.data);
  dbConnect.query('DELETE FROM students where id=?',[req.body.data.id],(err,result) => {
    if(err) throw err;

    res.send('Delete Successfully!')
  })
})


module.exports = router