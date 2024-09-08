import bindings from "bindings";
import { performance } from "node:perf_hooks";

const longLoop = bindings("long-loop");

function compute() {

    // Iniciar marca de tiempo
    performance.mark("intensive-loop-start");
    longLoop.longLoop((err, result) => {
        
        // Finalizar marca de tiempo
        performance.mark("intensive-loop-end");
    
        if (err) {
            console.error(err);
            return;
        }
    
        // Calcular el tiempo transcurrido
        const elapsedTime = performance.measure("intensive-loop-start", "intensive-loop-start");
    
        console.log(`La función se ejecutó en ${elapsedTime.duration} milisegundos.`);
    });
}

const interval = setInterval(() => {

    compute(); 
    console.log('do some work...');
    clearInterval(interval);
}, 5000);

