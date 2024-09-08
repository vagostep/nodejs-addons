import { performance } from "node:perf_hooks";

function compute() {

  // Start time mark
  performance.mark("intensive-loop-start");
  let result = 0;
  for (let i = 0; i < 1e10; ++i) {
    result += i;
  }

  // Stop time mark
  performance.mark("intensive-loop-end");

  // Calculating elapse time
  const elapsedTime = performance.measure("intensive-loop-start", "intensive-loop-start");

  console.log(`The function was executed in ${elapsedTime.duration} miliseconds.`);

}


/*
  In order to get metrics for ClinicJs, we executed an interval, so we can have a metric after 5 seconds
*/
const interval = setInterval(() => {

  compute(); 
  console.log('do some work...');
  clearInterval(interval);

}, 5000);
