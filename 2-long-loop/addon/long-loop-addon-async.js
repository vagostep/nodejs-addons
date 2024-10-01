import bindings from "bindings";
import http from 'http';
import { performance } from "node:perf_hooks";
import { transformMilisecondsToSeconds } from "../../utils/utils.js";

const PORT = 3000;

const longLoop = bindings("long-loop");

function compute() {

    return new Promise((resolve, reject) => {

      console.log('Starting long loop');// Start time mark
      performance.mark("intensive-loop-start");
        
      longLoop.longLoop((err, result) => {
      
        console.log('Finishing long loop');
        // Finalizar marca de tiempo
        performance.mark("intensive-loop-end");
    
        if (err) {
            reject(err);
        }
    
        // Calculating elapse time
        const elapsedTime = performance.measure("measure", "intensive-loop-start", "intensive-loop-end");
    
        resolve(transformMilisecondsToSeconds(elapsedTime.duration));
  
      });

    });
}

const server = http.createServer((req, res) => {

    // Definir los endpoints
    if (req.method === 'GET' && req.url === '/long-loop') {
   
      console.log('/open-loop');
      compute().then((result) => {
        console.log('result', result);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`The function was executed in ${result} seconds.\n`);
      });
    } else if (req.method === 'GET' && req.url === '/open-server'){
      
      console.log('/open-server');
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Server response\n');
    }
  });
  
  server.listen(PORT, () => {
    console.log(`Server listen on http://localhost:${PORT}`);
  });

