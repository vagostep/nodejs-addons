import cluster from 'cluster';
import http from 'http';
import { performance } from "node:perf_hooks";
import { transformMilisecondsToSeconds } from "../../utils/utils.js";

// const numWorkers = os.cpus().length;
const numWorkers = 2;
const PORT = 3000;

if (cluster.isPrimary) {
    console.log(`Master ${process.pid} is running`);
   
    // Crea el primer grupo de workers (para el primer tipo de endpoint)
    for (let i = 0; i < Math.floor(numWorkers / 2); i++) {
        cluster.fork({ CLUSTER_TYPE: 'regular' });
    }

    // Crea el segundo grupo de workers (para el segundo tipo de endpoint)
    for (let i = 0; i < Math.ceil(numWorkers / 2); i++) {
        cluster.fork({ CLUSTER_TYPE: 'intensive' });
    }

    // Manejo de eventos para cuando un worker se cierra
    cluster.on('exit', (worker) => {
        console.log(`Worker ${worker.process.pid} died`);
    });

} else {

    const clusterType = process.env.CLUSTER_TYPE;
    console.log(`Worker ${process.pid} started of type ${clusterType}`);

    const server = http.createServer((req, res) => {
        console.log('Request', req.url, clusterType)
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