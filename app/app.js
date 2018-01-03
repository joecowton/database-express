const express = require('express')
const app = express()
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


const Item = sequelize.define('item', {
  key: {
    type: Sequelize.STRING
  },
  value: {
    type: Sequelize.STRING
  }}, {
      instanceMethods: {
          getKey: function () {
              return this.get('key');
          },
      },
  });

  // Item.sync({force: true}).then(() => {
  //   return Item.create({
  //     key: 'default',
  //     value: 'default',
  //   });
  // });

app.get('/', function(req, res){
  res.send(200,'Hello');
});

app.get('/set',function(req,res){
  Item.create({key: 'somekey', value: req.query.somekey })
    .then(() =>{
      res.send(200, `${req.query.somekey} stored in database`)
    })
    .catch(error => res.status(400).send(error));
});

app.get('/get', function(req, res) {
  Item.findAll({where: { key: req.query['key'] }})
    .then(item => {
      res.send(200, `value taken from database: ${item[0].value }`)
    })
    .catch(error => res.status(400).send(error));
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
