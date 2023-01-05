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
let projectScheme = mongoose.Schema({
  name: String,
  path: String,
  description: String,
  image1: String,
  image2: String,
  image3: String,
  image4: String,
  image5: String,
  link: String
});

// Create scheme model
let Project = mongoose.model('Project', projectScheme)

/* GET projects */
router.get('/', function(req, res, next) {

  // Get projects from database
  Project.find(function(err, projects) {
    if(err) return console.error(err);

    let jsonObj = JSON.stringify(projects);
    res.contentType('application/json');
    res.send(jsonObj);
  });
});

/* Get specific project by id */
router.get('/:id', function(req, res, next) {

  let id = req.params.id;

  Project.findById(id, function (err, project) {
    if (err) throw err;

    let jsonObj = JSON.stringify(project);
    res.contentType('application/json');
    res.send(jsonObj); 
  });
});

/* Delete specific project */
router.delete('/:id', function(req, res, next) {
  let id = req.params.id;

  // Delete project with _id from db
  Project.deleteOne({ "_id": id }, function (err) {
    if (err) return handleError(err);
  });

  // Get new project list as response
  Project.find(function(err, projects) {
    if(err) return console.error(err);

    let jsonObj = JSON.stringify(projects);
    res.contentType('application/json');
    res.send(jsonObj);
  });
});


/* Add project to database*/
router.post('/', function(req, res, next) {

  // Create a new project
  let newProject = new Project({ 
      name: req.body.name, 
      path: req.body.path,
      description: req.body.description,
      image1: req.body.image,
      image2: req.body.image,
      image3: req.body.image,
      image4: req.body.image,
      image5: req.body.image,
      link: req.body.link
  });	

  // Save new project to db
  newProject.save(function(err) {
      if(err) return console.error(err);
  });

  let jsonObj = JSON.stringify(newProject);
  res.contentType('application/json');
  res.send(jsonObj);
});

/* Update project */
router.put('/:id', function(req, res, next) {

  var id = {'_id': req.params.id};
  let newData = req.body;

  Project.findOneAndUpdate(id, newData, {upsert: true}, function(err, project) {
    if (err) {
      return res.send(500, {error: err});
    } else {
      return res.json([
        'Project updated'
    ], 200);
    }
  });
});

module.exports = router;
