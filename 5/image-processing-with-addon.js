import bindings from "bindings";
import { transfromMilisecondsToSeconds } from "../utils/utils.js";
import { performance } from "node:perf_hooks";
const imageProcessor = bindings("image-processor");

const inputImagePath = `${import.meta.dirname}\\input.png`;
const outputImagePath = `${import.meta.dirname}\\output-cc.png`;

try {
    performance.mark("process-image-start");
    const result = imageProcessor.convertToGrayscale(inputImagePath, outputImagePath);
    console.log("The PNG file was created.");

    performance.mark("process-image-end");
    const elapsedTime = performance.measure("measure", "process-image-start", "process-image-end");

    console.log(`Se demoró ${transfromMilisecondsToSeconds(elapsedTime.duration)} segundos.`);
} catch (error) {
    console.error('Error:', error.message);
}