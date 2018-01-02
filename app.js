const express = require('express')
const app = express()
var session = require('express-session');
var MongoClient = require('mongodb').MongoClient


app.use(session({secret: "Shh, its a secret!"}));

app.get('/set', function(req, res){
  console.log(req.query.somekey)
  req.session.value = req.query.somekey;
  res.send(`Session value set as ${req.session.value}`)
})

app.get('/get', function(req, res) {
  if (req.query.key == 'somekey'){
    res.send(`This should print the value from the session: ${req.session.value}`)
  } else {
    res.redirect('/set')
  }
});

app.listen(4000, () => console.log('Example app listening on port 4000!'))
