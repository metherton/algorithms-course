var readline = require('readline');
var numberOfElements = 0;
var lineNumber = 0;
var elements;
var ints = [];
  
process.stdin.setEncoding('utf8');
var rl = readline.createInterface({
  input: process.stdin,
  terminal: false
});

rl.on('line', readLine);

function readLine(line) {
  var largest = 0;
  var secondLargest = 0;
  if (line !== "\n") {
    if (lineNumber === 0) {
      numberOfElements = parseInt(line.toString(), 10);
      lineNumber++;
    } else {
      elements = line.toString().split(' ');
      for (i = 0; i < numberOfElements; i++) {
        ints[i] = parseInt(elements[i], 10);
        if (ints[i] >= largest) {
          secondLargest = largest;;
          largest = ints[i];
        } else if (ints[i] >= secondLargest) {
          secondLargest = ints[i];
        }
      }
      console.log('max product is:', largest * secondLargest);
      process.exit();
    }
  }
}