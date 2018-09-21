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
  //console.log('count:', count);
  //console.log('keys:', listOfNumbers);
  if (count !== listOfNumbers.length) {
    console.log('Number of items in tree is different than expected..so exiting program');
  }
  let nodes = [];
  let queue = [];
  let root;
  let writeIndex = 0;
  let readIndex = 0;

  for (let i = 0; i < count; i += 1) {
    nodes[i] = {children: []};
    queue[i] = {};
  }

  for (let i = 0; i < count; i+=1) {
    let parentIndex = listOfNumbers[i];
    if (parentIndex === -1) {
      root = i;
    } else {
      nodes[parentIndex].children.push(nodes[i]);
    }
  }

//  console.log(nodes);
//  console.log('root is: ', root);
//   for (let i = 0; i < nodes[0].children.length; i++) {
//     console.log('child: ', nodes[0].children[i]);
//   }

  queue[writeIndex].node = nodes[root];
  queue[writeIndex].height = 1;
  writeIndex += 1;
  let dequeuedNode;
  while (writeIndex !== readIndex) {
    dequeuedNode = queue[readIndex];
    for (let i = 0; i < dequeuedNode.node.children.length; i++) {
      queue[writeIndex].node = dequeuedNode.node.children[i];
      queue[writeIndex].height = dequeuedNode.height + 1;
      writeIndex += 1;
    }
    readIndex += 1;
  }

  return dequeuedNode.height;
};

