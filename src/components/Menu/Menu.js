import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Spinner from "../Spinner/Spinner";
import { Button } from "@material-ui/core";

const Menu = (props) => {
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
                    setReady(true);
                })
                .catch((error) => {
                    window.alert(
                        "Please check your permissions: access to the camera is needed to estimate head position to control the snake."
                    );
                });
        }
    }, []);

    return (
        <Grid container direction="column" justify="center" alignItems="center">
            <Grid item>
                <video id="video" height="240" autoPlay playsInline></video>
            </Grid>
            <Grid item>
                {props.over ? (
                    <Button onClick={() => window.location.reload()}>Restart game</Button>
                ) : props.loading ? (
                    <Spinner />
                ) : (
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item>
                            <Button
                                onClick={props.startGame()}
                                disabled={!ready}
                            >
                                Start game
                            </Button>
                        </Grid>
                    </Grid>
                )}
            </Grid>
        </Grid>
    );
};

export default Menu;
