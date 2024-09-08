import { fork } from 'child_process';
import { performance } from "node:perf_hooks";

performance.mark("intensive-loop-start");
function compute() {

    const child = fork('./2-long-loop/child-process/child.js');
    child.on('message', () => {
        // Stop time mark
        performance.mark("intensive-loop-end");
    
        // Calculating elapse time
        const elapsedTime = performance.measure("intensive-loop-start", "intensive-loop-start");
    
        console.log(`La función se ejecutó en ${elapsedTime.duration} milisegundos.`);
    });
}

const interval = setInterval(() => {

    compute(); 
    console.log('do some work...');
    clearInterval(interval);
  
  }, 5000);