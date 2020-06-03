import React, { useEffect } from "react";

const Video = (props) => {
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
                    props.ready()
                })
                .catch((error) => {
                    window.alert(
                        "Please check your permissions: access to camera is needed to estimate head direction to control the snake."
                    );
                });
        }
    }, []);

    return (
        <video id="video" height="240" autoPlay playsInline></video>
    );
};

export default Video;
