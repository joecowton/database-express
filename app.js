const express = require('express')
const app = express()
var session = require('express-session');
const Sequelize = require('sequelize');
app.use(session({secret: "Shh, its a secret!"}));

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


const Item = sequelize.define('item', {
  value: {
    type: Sequelize.STRING
  },
});

Item.sync({force: true}).then(() => {
  // Table created
  return Item.create({
    value: 'default'
  });
});

Item.findOne().then(item => {
  console.log(item.get('item'));
});

app.get('/', function(req, res){
  res.render('item');
})

app.get('/set',function(req,res){
  req.session.query = req.query.somekey;
  Item.create({
    value: req.session.query,
  });
  res.send(`Session value set as ${req.session.query}`)
})


app.get('/get', function(req, res) {
  res.send(`This should print the value from the session: ${req.session.query[req.query.key]}`)
});

app.listen(4000, () => console.log('Example app listening on port 4000!'))

sequelize
.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});
