import fs from "fs";
import { performance } from "node:perf_hooks";
import { transfromMilisecondsToSeconds } from "../utils/utils.js";
import { createCanvas, loadImage } from "canvas";

async function convertToGrayscale(imagePath, outputPath) {

  performance.mark("process-image-start");
  const image = await loadImage(imagePath);
  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext("2d");

  ctx.drawImage(image, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] = avg; // Red
    data[i + 1] = avg; // Green
    data[i + 2] = avg; // Blue
  }

  ctx.putImageData(imageData, 0, 0);
  const buffer = canvas.toBuffer("image/png");
  fs.writeFileSync(outputPath, buffer);

  performance.mark("process-image-end");
  const elapsedTime = performance.measure(
    "measure",
    "process-image-start",
    "process-image-end"
  );
  console.log(
    `Se demoró ${transfromMilisecondsToSeconds(elapsedTime.duration)} segundos.`
  );
}

const inputImagePath = `${import.meta.dirname}\\input.png`;
const outputImagePath = `${import.meta.dirname}\\output-js.png`;

convertToGrayscale(inputImagePath, outputImagePath);

