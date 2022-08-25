var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Expressxss' });
// });

router.get('/personal', function(req,res,next){
  res.send(req.query)
})

router.post('/favorite', function(req, res, next){
  res.send(req.body)
})

router.post('/newOrder', async (req, res) => {


  req.app.io.emit('newOrder', { hasOrder: true });
  res.status(204).json({});
});

module.exports = router;
