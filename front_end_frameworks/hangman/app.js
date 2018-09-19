const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mysql = require('mysql')
const db = require('./db/db.js')
const passport = require('passport');
const Strategy = require('passport-local').Strategy;

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'hangman'
})

// =========================================================
// Passport
// =========================================================
passport.use(new Strategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, cb) {
    db.findByEmail(email, function(err, user) {
      console.log("At least we try to fine the user")
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});


const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());


// =========================================================
// Database
// =========================================================
connection.connect()
// connection.end()



// =========================================================
// Authentication
// =========================================================
app.post('/login', passport.authenticate('local'), 
  function(req, res) {
    console.log("I'm hit")
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ loggedin: true }))
  }
);
  
app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});



app.listen(3000)