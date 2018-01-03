var request = require("request");

var base_url = "http://localhost:4000/"
var set_url = "http://localhost:4000/set?somekey=somevalue"


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
});
