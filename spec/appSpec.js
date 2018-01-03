var request = require("request");

var base_url = "http://localhost:4000/"
var set_url = "http://localhost:4000/set?somekey=somevalue"
var get_url = "http://localhost:4000/get?key=somekey"


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
  },

});

describe("App", function() {
  describe("GET /", function() {
    it("returns status code 200", function() {
      request.get(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(200);
      });
    });

    it("returns Hello World", function(done) {
      request.get(base_url, function(error, response, body) {
        console.log(body);
        expect(body).toEqual('Hello');
        done();
      });
    });
  });

  describe("GET /set", function() {
    it("returns status code 200", function() {
      request.get(set_url, function(error, response, body) {
        expect(response.statusCode).toBe(200);
      });
    });

    it("returns Hello World", function(done) {
      request.get(set_url, function(error, response, body) {
        console.log(body);
        expect(body).toEqual('somevalue stored in database');
        done();
      });
    });
  });

  describe("GET /get", function() {
    it("returns status code 200", function() {
      request.get(get_url, function(error, response, body) {
        expect(response.statusCode).toBe(200);
      });
    });

    it("returns Hello World", function(done) {
      request.get(get_url, function(error, response, body) {
        console.log(body);
        expect(body).toEqual('value taken from database: somevalue');
        done();
      });
    });
  });

  describe("item", function(){
    it('should store key', function(){
      Item.findAll()
        .then(item => {
          expect(item.key).toEqual('somekey')
      })
    })

    it('should store value', function(){
      Item.findAll()
        .then(item => {
          expect(item.value).toEqual('somevalue')
      })
    })
  })

});
