'use strict';
var fs = require("fs");
/**
 * The Triangle Solver Object
 * @param {string} file The path to a file to be read into the program.
 */
function TriangleSolver(file) {
  this.file = file;
};
/**
 * This function takes a string arguement and sets the file variable to that to
 * then be read into the program.
 * @param  {String} inFile A string that signifies the path to the file you wish
 * to read.
 * @return {bool}       A dummy check to make sure that the file variable was 
 * set
 */
TriangleSolver.prototype.loadFile = function(inFile) {
  this.file = inFile;
  return true;
};
/**
 * After a file has been loaded in, parse the file and load it into a 2D array,
 * then parse a path to find the highes sum path.
 * @return {int} This is the sum of our computations
 */
TriangleSolver.prototype.execute = function() {
  var tri = [];
  /**
   * This is a recursive function that walks it's way down the tree to find the
   * highest value on the given path. The goal of this function is to fin out
   * whether the current column and row we are on is the highest, or if the
   * elements next to the current element are higher.
   * 
   * @param  {Array} tree This is the file that has been read in and mapped
   * @param  {int} row  This is the current row we are in on our 2D array
   * @param  {int} col  This is the current column we are at in our 2d array
   * @param  {int} sum  This is the value that we will be adding onto and 
   * returning
   * @return {int}      return the total sum of the highest path
   */
  function parseTri(tree, row, col, sum){
    if(row < tree.length){
      switch(col){
        case 0:
          if(tree[row][col] < tree[row][col+1]){
            col++;
          }
          break;
        case tree[row].length-1:
          if(tree[row][col] < tree[row][col-1]){
            col--;
          }
          break;
        default:
          if(tree[row][col] < tree[row][col-1] && tree[row][col+1] < tree[row][col-1]){
            col--;
          }
          else if(tree[row][col] < tree[row][col+1] && tree[row][col-1] < tree[row][col+1]){
            col++;
          }
          break;
      }
      sum += tree[row][col];
      console.log(["Row: "+row, "Col: "+col, "Value: "+tree[row][col], "Sum: " + sum]);
      return parseTri(tree, row+1, col, sum);
      
      
    }
    else{
      return sum;
    }
  }
  fs.readFileSync(this.file).toString().split('\n').forEach(function (inLine) {
    var newLine = inLine.toString().split(/[^0-9]+/g).map(Number);
    newLine.shift();
    tri.push(newLine);
  });
  tri.pop();

  var sum = parseTri(tri, 0, 0, 0);
  return sum;
};

exports.triangle = new TriangleSolver();