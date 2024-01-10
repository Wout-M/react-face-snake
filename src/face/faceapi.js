
import * as faceapi from "face-api.js"

export async function load() {
  Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri("/models")
  ])
    .catch((err) => {
      console.log("Error while loading model: " + err);
    });
  return true
}

export async function predict(canvas, video) {
  let detections = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions());
  if (!detections) { return null; }

  const x = (detections.box.topLeft.x + detections.box.bottomRight.x) / 2;
  const y = (detections.box.topLeft.y + detections.box.bottomRight.y) / 2;
  const firstVerticalBorder = video.videoWidth / 3;
  const secondVerticalBorder = (video.videoWidth / 3) * 2;
  const horizontalBorder = video.videoHeight / 2;
  let direction

  //right and left switched because mirror camera
  if (x <= firstVerticalBorder) {
    direction = "RIGHT";
  } else if (x >= secondVerticalBorder) {
    direction = "LEFT";
  } else if (y >= horizontalBorder) {
    direction = "DOWN";
  } else {
    direction = "UP";
  }

  return direction;
}
