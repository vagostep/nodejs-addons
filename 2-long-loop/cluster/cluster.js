import cluster from 'cluster';
import http from 'http';
import { performance } from "node:perf_hooks";
import { transformMilisecondsToSeconds } from "../../utils/utils.js";

// const numWorkers = os.cpus().length;
const numWorkers = 2;
const PORT = 3000;

if (cluster.isPrimary) {
    console.log(`Master ${process.pid} is running`);
   
    for (let i = 0; i < numWorkers; i++) {
        cluster.fork({ CLUSTER_TYPE: 'regular' });
    }

    // Manejo de eventos para cuando un worker se cierra
    cluster.on('exit', (worker) => {
        console.log(`Worker ${worker.process.pid} died`);
    });

} else {

    console.log(`Worker ${process.pid} started`);

    const server = http.createServer((req, res) => {
        console.log('Request to worker ', process.pid)
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
 
}

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