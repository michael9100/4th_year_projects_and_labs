const authMiddleware = require('./middleware/authMiddleware')

module.exports = function(app){
  app.post("/api/login", (req, res, next) => {  
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }
  
      if (!user) {
        return res.status(400).send([user, "Cannot log in", info]);
      }
  
      req.login(user, err => {
        res.send("Logged in");
      })
    })(req, res, next)
  })

  app.get("/api/logout", function(req, res) {  
    req.logout();
  
    console.log("logged out")
  
    return res.send();
  })

  app.get("/api/user", authMiddleware, (req, res) => {  
    let user = users.find(user => {
      return user.id === req.session.passport.user
    })
  
    console.log([user, req.session])
  
    res.send({ user: user })
  })
}