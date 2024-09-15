import bindings from "bindings";
import { fileURLToPath } from 'url';
import fs from "fs";

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const eventLoopQueues = bindings("event-loop-queues");


eventLoopQueues.addToTimerPhase(() => console.log('addToTimerPhase'), 0);
eventLoopQueues.addToCheckPhase(() => console.log('addToCheckPhase'));
eventLoopQueues.addToCloseQueue(() => console.log('addToCloseQueue'));
eventLoopQueues.addToPendingCallbacksQueue(() => console.log('addToPendingCallbacksQueue'));

setTimeout(() => console.log('setTimeout'), 0);
const interval = setInterval(() => {
    clearInterval(interval);
    console.log('setInterval');
}, 0);
process.nextTick(() => console.log('nextTick'));
Promise.resolve().then(() => console.log('promise'));
setImmediate(() => console.log('setImmediate'));

const readableStream = fs.createReadStream(__filename);
readableStream.close();
readableStream.on("close", () => {
    console.log("This is from readableStream close event callback");
});