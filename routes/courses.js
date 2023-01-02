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
let courseScheme = mongoose.Schema({
  name: String,
  syllabus: String,
  knowledge: String
});

// Create scheme model
let Course = mongoose.model('Course', courseScheme)

/* GET courses */
router.get('/', function(req, res, next) {

  // Get courses from databas
  Course.find(function(err, courses) {
    if(err) return console.error(err);

    let jsonObj = JSON.stringify(courses);
    res.contentType('application/json');
    res.send(jsonObj);
  });
});

/* Get specific course by id */
router.get('/:id', function(req, res, next) {

  let id = req.params.id;

  Course.findById(id, function (err, course) {
    if (err) throw err;

    let jsonObj = JSON.stringify(course);
    res.contentType('application/json');
    res.send(jsonObj); 
  });
});

/* Delete specific course */
router.delete('/:id', function(req, res, next) {
  let id = req.params.id;

  // Delete course with _id from db
  Course.deleteOne({ "_id": id }, function (err) {
    if (err) return handleError(err);
  });

  // Get new course list as response
  Course.find(function(err, courses) {
    if(err) return console.error(err);

    let jsonObj = JSON.stringify(courses);
    res.contentType('application/json');
    res.send(jsonObj);
  });
});


/* Add course to database*/
router.post('/', function(req, res, next) {

  // Create a new course
  let newCourse = new Course({ 
      name: req.body.name, 
      syllabus: req.body.syllabus,
      knowledge: req.body.knowledge
  });	

  // Save new course to db
  newCourse.save(function(err) {
      if(err) return console.error(err);
  });

  let jsonObj = JSON.stringify(newCourse);
  res.contentType('application/json');
  res.send(jsonObj);
});

/* Update course */
router.put('/:id', function(req, res, next) {

  var id = {'_id': req.params.id};
  let newData = req.body;

  Course.findOneAndUpdate(id, newData, {upsert: true}, function(err, course) {
    if (err) {
      return res.send(500, {error: err});
    } else {
      return res.json([
        'Kurs updated'
    ], 200);
    }
  });
});

module.exports = router;