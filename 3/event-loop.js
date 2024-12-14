import bindings from "bindings";
import { fileURLToPath } from 'url';
import fs from "fs";
import chalk from 'chalk';

const eventLoopQueues = bindings("event-loop-queues");

const __filename = fileURLToPath(import.meta.url); 

eventLoopQueues.addToPendingCallbacksQueue(() => console.log(chalk.green('addToPendingCallbacksQueue')));
eventLoopQueues.addToTimerQueue(() => console.log(chalk.yellow('addToTimerQueue')), 0);
eventLoopQueues.addToCheckQueue(() => console.log(chalk.magenta('addToCheckQueue')));

setTimeout(() => console.log('setTimeout'), 0);
const interval = setInterval(() => {
    clearInterval(interval);
    console.log('setInterval');
}, 0);
process.nextTick(() => console.log('nextTick'));
setImmediate(() => console.log('setImmediate'));
Promise.resolve().then(() => console.log('promise'));

fs.readFile(__filename, (err, data) => {
    console.log('This is from read file async');
})
