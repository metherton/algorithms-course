const readline = require('readline');

let lineNumber = 0;
let listOfNetworkPackets = [];
let networkBufferParameters = [];
let NETWORK_PACKET_PROCESSOR = {};

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
      networkBufferParameters = line.toString().split(' ').map(strToInt);
      lineNumber += 1;
    } else {
      listOfNetworkPackets[lineNumber - 1] = [];
      listOfNetworkPackets[lineNumber - 1] = line.toString().split(' ').map(strToInt);
      lineNumber += 1;
    }
    if ((lineNumber - 1) === parseInt(networkBufferParameters[1], 10)) {
      run();
    }
  }
}

function run() {
  const response = NETWORK_PACKET_PROCESSOR.calculate(networkBufferParameters, listOfNetworkPackets);
  for (let i = 0; i < response.length; i += 1) {
    console.log(response[i]);
  }
  process.exit();
}

rl.on('line', readLine);

NETWORK_PACKET_PROCESSOR.calculate = function(networkBuffParams, listOfPackets) {
  // console.log(networkBuffParams);
  // console.log(listOfPackets);
  let buffer = [];
  let finishTimes = [];
  let response = [];
  // for (let i = 0; i < networkBuffParams[0]; i += 1) {
  //   buffer[i] = {};
  //   finishTimes[i] = 0;
  // }
  let tail = 0;
  let head = 0;
  for (let i = 0; i < networkBuffParams[1]; i += 1) {
    if (finishTimes.length === 0) {
//    console.log('i:', i);
//    console.log('push:', listOfPackets[i][0]);
      response.push(listOfPackets[i][0]);
      finishTimes.push(listOfPackets[i][0] + listOfPackets[i][1]);
      buffer.push(listOfPackets[i]);
      tail += 1;
    } else {
      for (let j = 0; j < finishTimes.length; j += 1) {
 //    console.log('finishTimes[j]', finishTimes[j]);
 //    console.log('listOfPackets[i][0]', listOfPackets[i][0]);
        
        if (finishTimes[j] <= listOfPackets[i][0]) {
 //      console.log('pop it off');
          finishTimes.pop();
          tail -= 1;
        }
      }
      if (finishTimes.length === networkBuffParams[0]) {
        response.push(-1);
      } else {
 //    console.log('tail is', tail);
        let offset;
        if (finishTimes.length === 0) {
          offset = listOfPackets[i][0];
        } else {
          offset = finishTimes[tail - 1];
        }
        finishTimes[tail] = offset + listOfPackets[i][1];
        buffer.push(listOfPackets[i]);
        response.push(offset);
        tail += 1;
      }
    }
  }
  return response;
};

