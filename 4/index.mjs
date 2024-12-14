import bindings from "bindings";
import { performance } from "node:perf_hooks";

const longLoop = bindings("long-loop");

async function compute() {

  return new Promise((resolve, reject) => {
    // Start time mark
    performance.mark("intensive-loop-start");
    longLoop.longLoopSync();
    performance.mark("intensive-loop-end");
  
    // Calcular el tiempo transcurrido
    const measure = performance.measure("measure", "intensive-loop-start", "intensive-loop-end");
    resolve(measure);
  });

}

export const handler = async (event) => {
  const measure = await compute();
  
  return {
    statusCode: 200,
    body: JSON.stringify({ message: `Execution completed at ${measure.duration}` }),
  };
}

