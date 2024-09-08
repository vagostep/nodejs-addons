import { performance } from "node:perf_hooks";

function compute() {
    let result = 0;
    let i = 0;
  
    performance.mark("intensive-loop-start");
    const interval = setInterval(() => {
      const start = Date.now();
      while (i < 1e9 && (Date.now() - start) < 5000) { // it will execute 5000 cicles each time
        result += i;
        i++;
      }
      if (i >= 1e9) {
        // Stop time mark
        performance.mark("intensive-loop-end");
        clearInterval(interval);

        // Calculating elapse time
        const elapsedTime = performance.measure("intensive-loop-start", "intensive-loop-start");

        console.log(`La función se ejecutó en ${elapsedTime.duration} milisegundos.`);
      }
    }, 1);
  }

// Start time mark
compute();
console.log('Do some work...');