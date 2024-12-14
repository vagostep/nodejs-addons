import http from 'http';
import { performance } from "node:perf_hooks";
import { transfromMilisecondsToSeconds } from "../../utils/utils.js";

const PORT = 3000;
function compute() {

  let result = 0;
  for (let i = 0; i < 1e10; ++i) {
    result += i;
  }

}

const server = http.createServer((req, res) => {
  
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, GET',
    'Content-Type': 'application/json'
  };

  if (req.method === 'OPTIONS') {
    res.writeHead(204, headers);
    res.end();
  } else if (req.url === '/long-loop') {
 
    performance.mark("intensive-loop-start");
    compute();
    performance.mark("intensive-loop-end");

    res.writeHead(200, headers);
    const elapsedTime = performance.measure("measure", "intensive-loop-start", "intensive-loop-end");

    res.end(JSON.stringify({
      data: `El endpoint respondió en ${transfromMilisecondsToSeconds(elapsedTime.duration)} segundos.\n`
    }));
  } else if (req.url === '/open-server'){
    
    performance.mark("open-server-start");
    performance.mark("open-server-end");
    
    res.writeHead(200, headers);
    const elapsedTime = performance.measure("measure", "open-server-start", "open-server-end");

    res.end(JSON.stringify({
      data: `El endpoint respondió en ${transfromMilisecondsToSeconds(elapsedTime.duration)} segundos.\n`
    }));
  }
});

server.listen(PORT, () => {
  console.log(`Server listen on http://localhost:${PORT}`);
});

