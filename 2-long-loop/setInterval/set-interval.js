import http from 'http';
import { performance } from "node:perf_hooks";
import { transformMilisecondsToSeconds } from "../../utils/utils.js";

const PORT = 3000;

function compute() {
    let result = 0;
    let i = 0;
  
    performance.mark("intensive-loop-start");
    const interval = setInterval(() => {
      const start = Date.now();
      while (i < 1e10 && (Date.now() - start) < 5000) { // it will execute 5000 cicles each time
        result += i;
        i++;
      }
      if (i >= 1e10) {
        clearInterval(interval);
        console.log('Finishing long loop');
        // Stop time mark
        performance.mark("intensive-loop-end");
      }
    }, 1);
  }

const server = http.createServer((req, res) => {

  console.log(`Request to ${req.url}`);
  // Definir los endpoints
  if (req.method === 'GET' && req.url === '/long-loop') {
   
    compute();
    const elapsedTime = performance.measure("intensive-loop-start", "intensive-loop-start");

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