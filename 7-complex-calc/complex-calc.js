import { performance } from "node:perf_hooks";
import { transfromMilisecondsToSeconds } from "../utils/utils.js";

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Calcular Fibonacci de un número grande
const num = 45; // Puedes ajustar este número

performance.mark("complex-calc-start");
const result = fibonacci(num);
performance.mark("complex-calc-end");
const elapsedTime = performance.measure(
  "measure",
  "complex-calc-start",
  "complex-calc-end"
);
console.log(
  `Se demoró ${transfromMilisecondsToSeconds(
    elapsedTime.duration
  )} segundos.`
);

console.log(`Fibonacci de ${num} es ${result}`);