import { fork } from "child_process";
import http from "http";
import { performance } from "node:perf_hooks";
import { transfromMilisecondsToSeconds } from "../../utils/utils.js";

const PORT = 3000;

function compute() {
  return new Promise((resolve) => {

    performance.mark("intensive-loop-start");
    const child = fork("./2-long-loop/3/child.js");
    child.on("message", () => {

      // Stop time mark
      performance.mark("intensive-loop-end");

      // Calculating elapse time
      const elapsedTime = performance.measure(
        "measure",
        "intensive-loop-start",
        "intensive-loop-end"
      );

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

  // Definir los endpoints
  // Definir los endpoints
  // Endpoint para verificacion CORS
  if (req.method === "OPTIONS") {
    res.writeHead(204, headers);
    res.end();
  } else if (req.url === "/long-loop") {
    compute().then((result) => {
      res.writeHead(200, headers);
      res.end(
        JSON.stringify({
          data: `El endpoint respondió en ${result} segundos.\n`,
        })
      );
    });
  } else if (req.url === "/open-server") {
    performance.mark("open-server-start");
    res.writeHead(200, headers);
    performance.mark("open-server-end");
    const elapsedTime = performance.measure(
      "measure",
      "open-server-start",
      "open-server-end"
    );
    res.end(
      JSON.stringify({
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
