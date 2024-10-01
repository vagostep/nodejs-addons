import { parentPort } from 'worker_threads';

parentPort.on('message', () => {
  let result = 0;
  for (let i = 0; i < 1e10; i++) {
    result += i;
  }
  parentPort.postMessage(result);

   // Terminar el worker thread
   // process.exit();
});