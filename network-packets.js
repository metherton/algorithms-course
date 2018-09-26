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
 //    console.log('i:', i);
    if (finishTimes.length === 0) {

//  console.log('push:', listOfPackets[i][0]);
      response.push(listOfPackets[i][0]);
      finishTimes.push(listOfPackets[i][0] + listOfPackets[i][1]);
      buffer.push(listOfPackets[i]);
      tail += 1;
    } else {

      if (finishTimes.length > 0) {
  //      console.log('finishTimes greater than 0:', finishTimes);
        let j = 0;
        let finishTime = finishTimes[j];
        while (finishTime !== undefined) {
    //      console.log('in whilte with finishTime: ', finishTime);
          if (finishTimes[j] <= listOfPackets[i][0]) {
            finishTimes.splice(j, 1);
            tail -= 1;
   //        console.log('finishTimes after pop', finishTimes);
            finishTime = finishTimes[j];
          } else {
            finishTime = undefined;
            break;
            j += 1;
            finishTime = finishTimes[j];
  //         console.log('nothing to pop off this time');
          }
        }
      }


      if (finishTimes.length === networkBuffParams[0]) {
  //     console.log('buffer full');
        response.push(-1);
      } else {
  //     console.log('buffer not full');
 //  console.log('tail is', tail);
        let offset;
  //     console.log('finishTimes in else', finishTimes);
        if (finishTimes.length === 0) {
          offset = listOfPackets[i][0];
        } else {
          offset = finishTimes[tail - 1];
        }
        let latestFinishTime = offset + listOfPackets[i][1];
        finishTimes[tail] = latestFinishTime;
  //     console.log('finishTimes after new update', finishTimes);
        buffer.push(listOfPackets[i]);
   //    console.log('add response', offset);
        response.push(offset);
        tail += 1;
      }
    }
  }
  return response;
};

