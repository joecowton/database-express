const express = require('express')
const app = express()
const Sequelize = require('sequelize');

const sequelize = new Sequelize('mydb', 'josephcowton', null, {
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
    type: Sequelize.STRING,
    allowNull: false,
  },
  value: {
    type: Sequelize.STRING,
    allowNull: false,
    get() {
      return this.getDataValue('value');
    },
  }
});

app.get('/', function(req, res){
  res.send(200,'Hello World');
});

app.get('/set',function(req,res){
  Item.create({key: 'somekey', value: req.query.somekey })
    .then((item) =>{
      res.status(200).send(`${item.value} stored in database`)
    })
    .catch(error => res.status(400).send(error));
});

app.get('/get', function(req, res) {
  Item.findAll({where: { key: req.query['key'], id: req.query['id'] }})
    .then((items) => {
      res.status(200).send(`value taken from database: ${items[0].value}`)
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
