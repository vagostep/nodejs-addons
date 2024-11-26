import bindings from "bindings";
import { fileURLToPath } from 'url';
import fs from "fs";
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const eventLoopQueues = bindings("event-loop-queues");

eventLoopQueues.addToPendingCallbacksQueue(() => console.log(chalk.green('addToPendingCallbacksQueue')));
eventLoopQueues.addToTimerPhase(() => console.log(chalk.yellow('addToTimerPhase')), 0);
eventLoopQueues.addToCheckPhase(() => console.log(chalk.magenta('addToCheckPhase')));

setTimeout(() => console.log(chalk.yellow('setTimeout')), 0);
const interval = setInterval(() => {
    clearInterval(interval);
    console.log(chalk.yellow('setInterval'));
}, 0);
process.nextTick(() => console.log(chalk.blue('nextTick')));
setImmediate(() => console.log(chalk.magenta('setImmediate')));
Promise.resolve().then(() => console.log(chalk.blue('promise')));

fs.readFile(__filename, (err, data) => {
    console.log(chalk.green('This is from read file async'));
})
