var express = require('express')
var router = express.Router()

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get('/add', function (req, res) {
  res.send('adding user');
})
// define the about route
router.get('/show', function (req, res) {
  res.send('showing user');
})

router.get('/delete', function (req, res) {
  res.send('user deleted');
})

module.exports = router