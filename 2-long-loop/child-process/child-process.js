import { fork } from 'child_process';
import http from 'http';
import { performance } from "node:perf_hooks";
import { transformMilisecondsToSeconds } from "../../utils/utils.js";

const PORT = 3000;

function compute() {

    return new Promise((resolve) => {

        console.log('Starting long loop');// Start time mark
        performance.mark("intensive-loop-start");
        const child = fork('./2-long-loop/child-process/child.js');
        child.on('message', () => {
            console.log('Finishing long loop');

            // Stop time mark
            performance.mark("intensive-loop-end");
        
            // Calculating elapse time
            const elapsedTime = performance.measure("measure", "intensive-loop-start", "intensive-loop-end");
        
            resolve(transformMilisecondsToSeconds(elapsedTime.duration));
        });
    });
}

const server = http.createServer((req, res) => {

    // Definir los endpoints
    if (req.method === 'GET' && req.url === '/long-loop') {
   
      compute().then((result) => {
          console.log('result', result);
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end(`The function was executed in ${result} seconds.\n`);
      });
  
    } else if (req.method === 'GET' && req.url === '/open-server'){
      
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Server response\n');
    }
});
  
server.listen(PORT, () => {
    console.log(`Server listen on http://localhost:${PORT}`);
});