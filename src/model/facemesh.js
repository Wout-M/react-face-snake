import * as facemesh from "@tensorflow-models/facemesh";
import * as tf from "@tensorflow/tfjs-core";

export async function load() {
    // Load the MediaPipe facemesh model.
    return await facemesh.load();
}

export async function predict(model, video) {
    // Pass in a video stream (or an image, canvas, or 3D tensor) to obtain an
    // array of detected faces from the MediaPipe graph.
    if (model) {
        const predictions = await model.estimateFaces(video);

        if (predictions.length > 0) {
            return predictions[0].boundingBox;
        }
    } else {
        return "yeet";
    }
}
