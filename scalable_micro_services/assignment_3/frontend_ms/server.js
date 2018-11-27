const express = require('express')
const bodyParser = require('body-parser')  
const axios = require('axios');
const endpoints = require('./endpointUrls');
const app = express()
const port = 3001

app.use(bodyParser.json())

app.get('/', (req, res) => res.send('Hello World!'))
//================================================
//    Endpoints
//================================================
app.post("/api/register", (req, res, next) => {
  axios.post(`${endpoints.authUrl}/api/register`, req.body).then(micro_res => {
    res.send(micro_res.data)
  })
  .catch(err => {
    console.log(err)
    return res.status(500).send("Error")
  })
  req.end()
})

app.post("/api/login", (req, res, next) => {  
  axios.post(`${endpoints.authUrl}/api/login`, req.body).then(micro_res => {
    res.send(micro_res.data)
  })
  .catch(err => {
    console.log(err)
    // return res.send(err)
    return reject(err);    
  })
})

app.get("/api/logout", function(req, res) {  
  axios.get(`${endpoints.authUrl}/api/logout`).then(micro_res => {
    res.send(micro_res.data)
  })
  .catch(err => {
    console.log(err)
    // if (err) {
    return res.reject(err);
    // }
    // return res.send(err)
  })
})

// app.get("/api/user", authMiddleware, (req, res) => {  
//   let user = users.find(user => {
//     return user.id === req.session.passport.user
//   })

//   console.log([user, req.session])

//   res.send({ user: user })
// })


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
