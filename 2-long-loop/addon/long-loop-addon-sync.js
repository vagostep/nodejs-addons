import bindings from "bindings";
import { performance } from "node:perf_hooks";

const longLoop = bindings("long-loop");

function compute() {

    // Iniciar marca de tiempo
    performance.mark("intensive-loop-start");
    longLoop.longLoopSync();
    // Finalizar marca de tiempo
    performance.mark("intensive-loop-end");

    // Calcular el tiempo transcurrido
    const elapsedTime = performance.measure("measure", "intensive-loop-start", "intensive-loop-end");
    
    console.log(`La función se ejecutó en ${elapsedTime.duration} milisegundos.`);
}

const interval = setInterval(() => {

    compute(); 
    console.log('do some work...');
    clearInterval(interval);
}, 5000);

