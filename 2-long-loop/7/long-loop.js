import http from 'http';
import { performance } from "node:perf_hooks";
import { transfromMilisecondsToSeconds } from "../../utils/utils.js";

const PORT = 3000;
function compute() {

  // Empieza medición
  performance.mark("intensive-loop-start");
  let result = 0;
  for (let i = 0; i < 1e10; ++i) {
    result += i;
  }

  // Finaliza medicion
  performance.mark("intensive-loop-end");
}

const server = http.createServer((req, res) => {
  
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, GET',
    'Content-Type': 'application/json'
  };

  // Endpoint para verificacion CORS
  if (req.method === 'OPTIONS') {
    res.writeHead(204, headers);
    res.end();
  } else if (req.url === '/long-loop') {
 
    compute();

    // Calcula el tiempo de ejecución
    const elapsedTime = performance.measure("measure", "intensive-loop-start", "intensive-loop-end");
    console.log(`El endpoint respondió en ${transfromMilisecondsToSeconds(elapsedTime.duration)} segundos.`);
    res.writeHead(200, headers);
    res.end(JSON.stringify({
      data: `El endpoint respondió en ${transfromMilisecondsToSeconds(elapsedTime.duration)} segundos.\n`
    }));
  } else if (req.url === '/open-server'){
    
    performance.mark("open-server-start");
    res.writeHead(200, headers);
    performance.mark("open-server-end");
    const elapsedTime = performance.measure("measure", "open-server-start", "open-server-end");
    res.end(JSON.stringify({
      data: `El endpoint respondió en ${transfromMilisecondsToSeconds(elapsedTime.duration)} segundos.\n`
    }));
  }
});

server.listen(PORT, () => {
  console.log(`Server listen on http://localhost:${PORT}`);
});

