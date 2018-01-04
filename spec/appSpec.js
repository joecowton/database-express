var request = require("request");

var base_url = "http://localhost:4000/"
var set_url = "http://localhost:4000/set?somekey=somevalue"
var get_url = "http://localhost:4000/get?key=somekey&id=3"


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
        expect(body).toEqual('Hello World');
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

    it("stores value in database", function(done) {
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

    it("returns value from database", function(done) {
      request.get(get_url, function(error, response, body) {
        console.log(body);
        expect(body).toEqual('value taken from database: somevalue');
        done();
      });
    });
  });
});
