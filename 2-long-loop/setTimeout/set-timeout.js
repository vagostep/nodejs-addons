import http from 'http';
import { performance } from "node:perf_hooks";
import { transformMilisecondsToSeconds } from "../../utils/utils.js";

const PORT = 3000;
function compute() {
    let result = 0;
    let i = 0;
  
    function next() {

      const start = Date.now();
      while (i < 1e10 && (Date.now() - start) < 5000) { // it will execute 5000 cicles each time
        result += i;
        i++;
      }
      
      if (i < 1e10) {
        setTimeout(next, 0);
      } else {

        console.log('Finishing long loop');
        // Stop time mark
        performance.mark("intensive-loop-end");
      }
    }
  
    console.log('Starting long loop');
    performance.mark("intensive-loop-start");
    next();
}


const server = http.createServer((req, res) => {

  // Definir los endpoints
  if (req.method === 'GET' && req.url === '/long-loop') {
    
    compute();
    const elapsedTime = performance.measure("measure", "intensive-loop-start", "intensive-loop-end");

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
  