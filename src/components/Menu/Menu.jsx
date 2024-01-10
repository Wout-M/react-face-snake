import { useState, useEffect } from "react";

import { Button, Typography, Grid } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';

import classes from "./Menu.module.css"
import Spinner from "../Spinner/Spinner";

export default function Menu(props) {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        let video = document.getElementById("video");

        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices
                .getUserMedia({ video: true })
                .then((stream) => {
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

    useEffect(() => {
        if (props.started) setReady(false);
    }, [props]);

    return (
        <Grid container direction="column" justifyContent = "center" alignItems="center">
            <Grid item>
                <video
                    className={classes.video}
                    id="video"
                    autoPlay
                    playsInline
                />
            </Grid>
            <Grid item style={{ width: "100%" }}>
                {props.over ? (
                    <Button
                        onClick={() => window.location.reload()}
                        color="primary"
                        variant="contained"
                        className={classes.button}
                    >
                        Restart game
                    </Button>
                ) : props.loading ? (
                    <Spinner />
                ) : (
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Grid item>
                            <Button
                                onClick={props.openDialog()}
                                color="primary"
                                variant="contained"
                                >
                                <HelpIcon />
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                onClick={props.startGame()}
                                disabled={!ready}
                                color="primary"
                                variant="contained"
                            >
                                <Typography variant="body1">
                                    Start game
                                </Typography>
                            </Button>
                        </Grid>
                    </Grid>
                )}
                <Grid item>
                    <Typography
                        variant="subtitle2"
                        style={{ marginTop: "10px" }}
                    >
                        Disclaimer: This game is made for pc
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        style={{ marginBottom: "-10px" }}
                    >
                        Mobile support is still in development
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
};
