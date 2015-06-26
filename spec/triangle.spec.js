var fs = require("fs");
var triangleSolver = require("../app/triangle");

console.dir(triangleSolver.triangle);
describe("Triangle Problem", function(){
  describe("Load file", function(){
    it("should return true", function(done){
      var response = triangleSolver.triangle.loadFile("generated_triangle.txt");
      expect(response).toBe(true);
      done();
    });
    it("should compute return the 14584", function(done){
      var value = triangleSolver.triangle.execute();
      expect(value).toBe(14584);
      //I actually get a higher number: 15334
      done();
    });
  });
});