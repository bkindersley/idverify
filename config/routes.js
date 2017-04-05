const express = require('express');
const router = express.Router();
const path = require('path');


router.post('/login', function(req,res){
    //yes, terrible security
    if (req.body.uname == "user" && req.body.pw == "pw"){
      res.cookie('loggedIn', true);
      res.redirect('/clients');
    }
    else {
      res.redirect('/');
    }
});

//serving pages
router.get('/', function (req, res) {
  if (req.cookies.loggedIn){
    res.redirect('/clients');
  }
  else {
    res.render('index');
  }
});

router.get('/clients', function (req, res) {
  if (req.cookies.loggedIn){
    res.render('clientList');
  }
  else {
    res.redirect('/');
  }
});

router.get('/clients', function(req, res){
  res.render('clientList')
});

//api functions
//mock database
router.get('/api/get-clients', function(req,res){
  res.json([{
    "id": 1,
    "firstName": "Ludwig",
    "lastName": "von Beethoven",
    "dateOfBirth": "1770-12-16",
    "verified": 0
  },
  {
    "id": 2,
    "firstName": "Jane",
    "lastName": "Doe",
    "dateOfBirth": "1970-01-01",
    "verified": 0
  },
  {
    "id": 3,
    "firstName": "Annie",
    "lastName": "Heed",
    "dateOfBirth": "1940-01-05",
    "verified": 0
  }
]);
});

//mock id verifier
router.post('/verifyapi/verifyClient', function(req, res){
  var fname = req.body.PersonInfo.firstName;
  var lname = req.body.PersonInfo.lastName;
  var dob = req.body.PersonInfo.dateOfBirth;
  if ((fname == "Ludwig" & lname == "von Beethoven"  & dob == "1770-12-16") |
  (fname == "Jane" & lname == "Doe"  & dob == "1970-01-01")){
    res.json([{
      status: 1,
      error: null
    }]);
  }
  else {
    res.json([{
      status: 2,
      error: null
    }]);
  }
});



module.exports = router;
