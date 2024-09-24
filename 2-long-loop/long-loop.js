import http from 'http';
import { performance } from "node:perf_hooks";
import { transformMilisecondsToSeconds } from "../utils/utils.js";

const PORT = 3000;
function compute() {

  console.log('Starting long loop');
  // Start time mark
  performance.mark("intensive-loop-start");
  let result = 0;
  for (let i = 0; i < 1e10; ++i) {
    result += i;
  }

  console.log('Finishing long loop');
  // Stop time mark
  performance.mark("intensive-loop-end");

  // Calculating elapse time
  performance.measure("intensive-loop-start", "intensive-loop-start");
}

const server = http.createServer((req, res) => {

  console.log(`Request to ${req.url}`);
  // Definir los endpoints
  if (req.method === 'GET' && req.url === '/long-loop') {
 
    compute();

    const elapsedTime = performance.measure("intensive-loop-start", "intensive-loop-end");
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`The function was executed in ${transformMilisecondsToSeconds(elapsedTime.duration)} seconds.\n`);
  } else if (req.method === 'GET' && req.url === '/open-server'){
    
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Server response\n');
  }
});

server.listen(PORT, () => {
  console.log(`Server listen on http://localhost:${PORT}`);
});

