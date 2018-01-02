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
  key: {
    type: Sequelize.STRING
  },
  value: {
    type: Sequelize.STRING
  },

});

  // Item.sync({force: true}).then(() => {
  //   return Item.create({
  //     key: 'default',
  //     value: 'default',
  //   });
  // });

// Item.findOne().then(item => {
//   console.log(item.get('item'));
// });

app.get('/', function(req, res){
  res.render('item');
})

app.get('/set',function(req,res){
  Item.create({key: 'somekey', value: req.query.somekey } );
  res.send(`${req.query.somekey} stored in database`)
})

app.get('/get', function(req, res) {
  console.log(req.query[req.query.key]);
  Item.findAll({ raw: true, where: { key: req.query.key }  }).then(item =>
  { res.json(item)}

    // ({ where: { key: req.query.key } })

  );
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
