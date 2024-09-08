import { performance } from "node:perf_hooks";

function compute() {
    let result = 0;
    let i = 0;
  
    function next() {

      const start = Date.now();
      while (i < 1e9 && (Date.now() - start) < 5000) { // it will execute 5000 cicles each time
        result += i;
        i++;
      }
      if (i < 1e9) {
        setTimeout(next, 1);
      } else {
        // Stop time mark
        performance.mark("intensive-loop-end");
        
        // Calculating elapse time
        const elapsedTime = performance.measure("intensive-loop-start", "intensive-loop-start");

        console.log(`La función se ejecutó en ${elapsedTime.duration} milisegundos.`);
      }
    }
  
    performance.mark("intensive-loop-start");
    next();
  }
  
compute();
console.log('Do some work...');