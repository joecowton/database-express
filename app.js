const express = require('express')
const app = express()
var session = require('express-session');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('mydb', 'josephcowton', 'Thechronic1', {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000
        },
});


const User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

User.sync({force: true}).then(() => {
  // Table created
  return User.create({
    firstName: 'John',
    lastName: 'Hancock'
  });
});

User.findOne().then(user => {
  console.log(user.get('firstName'));
});

app.use(session({secret: "Shh, its a secret!"}));

app.get('/set', function(req, res){
  req.session.query = req.query;
  res.send(`Session value set as ${req.session.query}`)
})

app.get('/get', function(req, res) {
  res.send(`This should print the value from the session: ${req.session.query[req.query.key]}`)
});

app.listen(4000, () => console.log('Example app listening on port 4000!'))
