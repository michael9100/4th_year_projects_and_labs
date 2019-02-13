var mysql = require('mysql')

exports.MODE_PRODUCTION = 'mode_production'

var state = {
  pool: null,
  mode: null,
}

exports.connect = function(mode, done) {
  state.pool = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'hangman'
  })

  state.mode = mode
  done()
}

var dummyData = [
  { id: 1, username: 'michael', password: 'secret', email: 'michael@example.com' },
  { id: 2, username: 'paulina', password: 'password', email: 'paulina@example.com' }
]

// =========================================================
// Auth
// =========================================================
exports.createUser = function(data) {
  console.log("Data", data)
}

exports.findById = function(id, cb) {
  process.nextTick(function() {
    var idx = id - 1
    if (dummyData[idx]) {
      cb(null, dummyData[idx])
    } else {
      cb(new Error('User ' + id + ' does not exist'))
    }
  })
}

exports.findByEmail = function(email, cb) {
  process.nextTick(function() {
    for (var i = 0, len = dummyData.length; i < len; i++) {
      var user = dummyData[i]
      if (user.email === email) {
        return cb(null, user)
      }
    }
    return cb(null, null)
  })
}