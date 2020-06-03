import * as facemesh from "@tensorflow-models/facemesh";

export async function load() {
    return await facemesh.load();
}

export async function predict(model, video) {

    if (model) {
        const predictions = await model.estimateFaces(video);

        if (predictions.length > 0) {
            return predictions[0].boundingBox;
        }
    }
}