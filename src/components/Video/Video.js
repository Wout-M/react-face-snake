import React, { useEffect, useState } from "react";

const Video = (props) => {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        let video = document.getElementById("video");

        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            // Not adding `{ audio: true }` since we only want video now
            navigator.mediaDevices
                .getUserMedia({ video: true })
                .then((stream) => {
                    //video.src = window.URL.createObjectURL(stream);
                    video.srcObject = stream;
                    video.play();
                    setReady(true)
                })
                .catch((error) => {
                    window.alert(
                        "Please check your permissions: access to the camera is needed to estimate head position to control the snake."
                    );
                });
        }
    }, []);


    useEffect(() => {
        if (ready) props.ready()
    }, [props, ready])

    return (
        <video id="video" height="240" autoPlay playsInline></video>
    );
};

export default Video;
