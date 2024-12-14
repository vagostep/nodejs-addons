import bindings from "bindings";
import http from "http";
import { performance } from "node:perf_hooks";
import { transfromMilisecondsToSeconds } from "../../utils/utils.js";

const PORT = 3000;

const addon = bindings("addon");

function compute() {
  return new Promise((resolve, reject) => {
    performance.mark("intensive-loop-start");

    addon.longLoop((err, result) => {

      if (err) {
        reject(err);
      }
      
      performance.mark("intensive-loop-end");
      const elapsedTime = performance.measure("measure", "intensive-loop-start", "intensive-loop-end");
      
      resolve(transfromMilisecondsToSeconds(elapsedTime.duration));
    });
  });
}

const server = http.createServer((req, res) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, GET",
    "Content-Type": "application/json",
  };

  if (req.method === "OPTIONS") {
    res.writeHead(204, headers);
    res.end();
  } else if (req.url === "/long-loop") {

    compute().then((result) => {
      
      res.writeHead(200, headers);

      res.end(JSON.stringify({
          data: `El método fue ejecutado en ${result} segundos.\n`,
        })
      );
    });
  } else if (req.url === "/open-server") {

    performance.mark("open-server-start");
    performance.mark("open-server-end");

    res.writeHead(200, headers);
    const elapsedTime = performance.measure("measure", "open-server-start", "open-server-end");

    res.end(JSON.stringify({
        data: `El endpoint respondió en ${transfromMilisecondsToSeconds(
          elapsedTime.duration
        )} segundos.\n`,
      })
    );
  }
});

server.listen(PORT, () => {
  console.log(`Server listen on http://localhost:${PORT}`);
});
