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
let workScheme = mongoose.Schema({
  company: String,
  title: String,
  period: String
});

// Create scheme model
let Work = mongoose.model('Work', workScheme)

/* GET projects */
router.get('/', function(req, res, next) {

  // Get work from database
  Work.find(function(err, work) {
    if(err) return console.error(err);

    let jsonObj = JSON.stringify(work);
    res.contentType('application/json');
    res.send(jsonObj);
  });
});

/* Get specific work by id */
router.get('/:id', function(req, res, next) {

  let id = req.params.id;

  Work.findById(id, function (err, work) {
    if (err) throw err;

    let jsonObj = JSON.stringify(work);
    res.contentType('application/json');
    res.send(jsonObj); 
  });
});

/* Delete specific work */
router.delete('/:id', function(req, res, next) {
  let id = req.params.id;

  // Delete work with _id from db
  Work.deleteOne({ "_id": id }, function (err) {
    if (err) return handleError(err);
  });

  // Get new work list as response
  Work.find(function(err, work) {
    if(err) return console.error(err);

    let jsonObj = JSON.stringify(work);
    res.contentType('application/json');
    res.send(jsonObj);
  });
});


/* Add work to database*/
router.post('/', function(req, res, next) {

  // Create a new work
  let newWork = new Work({ 
      company: req.body.company, 
      title: req.body.title,
      period: req.body.period
  });	

  // Save new work to db
  newWork.save(function(err) {
      if(err) return console.error(err);
  });

  let jsonObj = JSON.stringify(newWork);
  res.contentType('application/json');
  res.send(jsonObj);
});

/* Update work */
router.put('/:id', function(req, res, next) {

  var id = {'_id': req.params.id};
  let newData = req.body;

  Work.findOneAndUpdate(id, newData, {upsert: true}, function(err, work) {
    if (err) {
      return res.send(500, {error: err});
    } else {
      return res.json([
        'Work updated'
    ], 200);
    }
  });
});

module.exports = router;
