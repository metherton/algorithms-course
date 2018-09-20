var readline = require('readline');

let lineNumber = 0;
let listOfNumbers;
let numbersCount;
let TREE_HEIGHT = {};

process.stdin.setEncoding('utf8');

var rl = readline.createInterface({
  input: process.stdin,
  terminal: false,
});

function strToInt(item) {
  return parseInt(item, 10);
}

function readLine(line) {
  if (line !== '\n') {
    if (lineNumber === 0) {
      numbersCount = parseInt(line, 10);
      lineNumber += 1;
    } else {
      listOfNumbers = line.toString().split(' ');
      console.log(TREE_HEIGHT.calculate(numbersCount, listOfNumbers.map(strToInt)));
      process.exit();
    }
  }
}

rl.on('line', readLine);

TREE_HEIGHT.calculate = function(count, listOfNumbers) {
  console.log('count:', count);
  console.log('keys:', listOfNumbers);
  return 5;
};

