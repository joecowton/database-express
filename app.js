const express = require('express')
const app = express()
var session = require('express-session');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://localhost:4000/mydb');


app.use(session({secret: "Shh, its a secret!"}));

app.get('/set', function(req, res){
  req.session.query = req.query;
  res.send(`Session value set as ${req.session.query}`)
})

app.get('/get', function(req, res) {
  res.send(`This should print the value from the session: ${req.session.query[req.query.key]}`)
});

app.listen(4000, () => console.log('Example app listening on port 4000!'))
