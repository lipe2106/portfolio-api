var express = require('express');
var router = express.Router();

const bodyParser = require('body-parser');
router.use(
  bodyParser.urlencoded({
    extended: true
  })
)
router.use(bodyParser.json());

// Database connection
let mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/portfolio', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise; // Global use of mongoose

let db = mongoose.connection;
db.on('error', console.error.bind(console,'connection error:'));
db.once('open', function (callback) { // Add the listener for db events 
  console.log("Connected to db");

  // Create db scheme
  let projectScheme = mongoose.Schema({
    name: String,
    description: String,
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
        description: req.body.description,
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

}); // DB connection

module.exports = router;
