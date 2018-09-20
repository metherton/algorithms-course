var readline = require('readline');
var lineNumber = 0;
var listOfNumbers, keysToSearch;
var r;


process.stdin.setEncoding('utf8');

var rl = readline.createInterface({
  input: process.stdin,
  terminal: false
});

rl.on('line', readLine);

function readLine(line) {
  if (line !== "\n") {
    if (lineNumber === 0) {
      listOfNumbers = line.toString().split(' ');
      lineNumber++;
    } else {
      keysToSearch = line.toString().split(' ');
      console.log(BINARY_SEARCH.calculate(listOfNumbers.map(strToInt), keysToSearch.map(strToInt)));
      process.exit();
    }
  }
}

function strToInt(item) {
  return parseInt(item,10)
}

var BINARY_SEARCH = {} || BINARY_SEARCH;


BINARY_SEARCH.calculate = function(listOfNumbers, keysToSearch) {
  console.log('list:', listOfNumbers);
  console.log('keys:', keysToSearch);
  var results = [];
  return results.join(" ");
};

