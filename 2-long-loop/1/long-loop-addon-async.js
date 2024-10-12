import bindings from "bindings";
import http from 'http';
import { performance } from "node:perf_hooks";
import { transfromMilisecondsToSeconds } from "../../utils/utils.js";

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
    
        resolve(transfromMilisecondsToSeconds(elapsedTime.duration));
  
      });

    });
}

const server = http.createServer((req, res) => {

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, GET',
    'Content-Type': 'application/json'
  };
  
    // Definir los endpoints
    // Endpoint para verificacion CORS
  if (req.method === 'OPTIONS') {
    res.writeHead(204, headers);
    res.end();
  } else if (req.url === '/long-loop') {
   
      console.log('/open-loop');
      compute().then((result) => {
        console.log(`El método fue ejecutado en ${result} segundos.`);
        res.writeHead(200, headers);
        res.end(JSON.stringify({
          data: `El método fue ejecutado en ${result} segundos.\n`
        }));
      });
    } else if (req.url === '/open-server'){
      
      res.writeHead(200, headers);
      res.end(JSON.stringify({
        data: `Llamada finalizada\n`
      }));
    }
  });
  
  server.listen(PORT, () => {
    console.log(`Server listen on http://localhost:${PORT}`);
  });

