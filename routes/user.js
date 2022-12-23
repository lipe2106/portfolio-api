var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
router.use(
  bodyParser.urlencoded({
    extended: true
  })
)
router.use(bodyParser.json());

// Create db scheme
let userScheme = mongoose.Schema({
  name: String,
  description: String,
  title: String,
  quote: String
});

// Create scheme model
let User = mongoose.model('User', userScheme)

/* GET user */
router.get('/', function(req, res, next) {

  // Get info from database
  User.find(function(err, user) {
    if(err) return console.error(err);

    let jsonObj = JSON.stringify(user);
    res.contentType('application/json');
    res.send(jsonObj);
  });
});

/* Get specific user by id */
router.get('/:id', function(req, res, next) {

  let id = req.params.id;

  User.findById(id, function (err, user) {
    if (err) throw err;

    let jsonObj = JSON.stringify(user);
    res.contentType('application/json');
    res.send(jsonObj); 
  });
});

/* Delete specific user */
router.delete('/:id', function(req, res, next) {
  let id = req.params.id;

  // Delete user with _id from db
  User.deleteOne({ "_id": id }, function (err) {
    if (err) return handleError(err);
  });

  // Get user as response
  User.find(function(err, user) {
    if(err) return console.error(err);

    let jsonObj = JSON.stringify(user);
    res.contentType('application/json');
    res.send(jsonObj);
  });
});


/* Add userinfo to database*/
router.post('/', function(req, res, next) {

  // Create a new user
  let newUser = new User({ 
      name: req.body.name, 
      description: req.body.description,
      title: req.body.title,
      quote: req.body.quote
  });	

  // Save new user to db
  newUser.save(function(err) {
      if(err) return console.error(err);
  });

  let jsonObj = JSON.stringify(newUser);
  res.contentType('application/json');
  res.send(jsonObj);
});

/* Update userinfo */
router.put('/:id', function(req, res, next) {

  var id = {'_id': req.params.id};
  let newInfo = req.body;

  User.findOneAndUpdate(id, newInfo, {upsert: true}, function(err, project) {
    if (err) {
      return res.send(500, {error: err});
    } else {
      return res.json([
        'User updated'
    ], 200);
    }
  });
});

module.exports = router;
