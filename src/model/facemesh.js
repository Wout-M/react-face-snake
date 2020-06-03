import * as facemesh from "@tensorflow-models/facemesh";
import * as tf from "@tensorflow/tfjs-core";

export async function load() {
    return await facemesh.load();
}

export async function predict(model, video) {
    tf.setBackend("webgl");
    if (model) {
        const predictions = await model.estimateFaces(video);

        if (predictions.length > 0) {
            let direction;

            const x =
                (predictions[0].boundingBox.topLeft[0][0] +
                    predictions[0].boundingBox.bottomRight[0][0]) /
                2;
            const y =
                (predictions[0].boundingBox.topLeft[0][1] +
                    predictions[0].boundingBox.bottomRight[0][1]) /
                2;

            const firstVerticalBorder = video.videoWidth / 3;
            const secondVerticalBorder = (video.videoWidth / 3) * 2;
            const horizontalBorder = video.videoHeight / 2;

            if (x <= firstVerticalBorder) {
                direction = "LEFT";
            } else if (x >= secondVerticalBorder) {
                direction = "RIGHT";
            } else if (y >= horizontalBorder) {
                direction = "DOWN";
            } else {
                direction = "UP";
            }
            return direction;
        }
    }
}
