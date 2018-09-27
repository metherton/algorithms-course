const request = (arrivalTime, processTime) => {
  return {
    arrivalTime: () => {
      return arrivalTime;
    },
    processTime: () => {
      return processTime;
    }
  };
};

const response = (dropped, startTime) => {
  return {
    dropped: () => {
      return dropped;
    },
    startTime: () => {
      return startTime;
    }
  };
};

const buffer = (bufferSize) => {
  let finishTimes = [];
  return {
    bufferSize: () => {
      return bufferSize;
    },
    finishTimes: () => {
      return finishTimes;
    },
    process: (request) => {
      return response(false, -1);
    }
  };
};

const packageProcessor = () => {

  let bufferSize, numberOfIncomingNetworkPackets;
  let listOfNetworkPackets = [];
  let lineNumber = 0;
  let packageBuffer;
  let responses = [];

  function readLine(line) {
    if (bufferSize === undefined) {
      const firstLine = line.toString().split(' ').map(strToInt);
      bufferSize = firstLine[0];
      packageBuffer = buffer(bufferSize);
      numberOfIncomingNetworkPackets = firstLine[1];
    } else {
      listOfNetworkPackets[lineNumber] = [];
      const packetLine = line.toString().split(' ').map(strToInt);
      listOfNetworkPackets[lineNumber] = request(packetLine[0], packetLine[1]);
      lineNumber += 1;
    }
    if (lineNumber === numberOfIncomingNetworkPackets) {
      run();
    }
  }

  function strToInt(item) {
    return parseInt(item, 10);
  }

  function run() {
    for (let i = 0; i < numberOfIncomingNetworkPackets; i += 1) {
      responses.push(packageBuffer.process(listOfNetworkPackets[i]));
    }
    printResponses();    
  }

  function printResponses() {
    for (let i = 0; i < numberOfIncomingNetworkPackets; i += 1) {
      if (responses[i].dropped()) {
        console.log('-1');
      } else {
        console.log(responses[i].startTime());
      }
    }
    process.exit();
  }
  
  return {

    readInput: () => {
      const readline = require('readline');
      process.stdin.setEncoding('utf8');
      var rl = readline.createInterface({
        input: process.stdin,
        terminal: false,
      });
      rl.on('line', readLine);
    },
    

  }
};

packageProcessor().readInput();