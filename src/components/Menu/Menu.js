import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Spinner from "../Spinner/Spinner";
import { Button, Typography, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import HelpIcon from "@material-ui/icons/Help";

const useStyles = makeStyles((theme) => ({
    video: {
        borderRadius: theme.spacing(1),
        marginBottom: theme.spacing(2),
        width: "100%",
    },
    button: {
        background: "#6420f5",
        "&:hover": {
            background: "#000094"
        }
    }
}));

const Menu = (props) => {
    const [ready, setReady] = useState(false);
    const classes = useStyles();

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

    useEffect(() => {
        if (props.started) setReady(false);
    }, [props]);

    return (
        <Grid container direction="column" justify="center" alignItems="center">
            <Grid item>
                <video
                    className={classes.video}
                    id="video"
                    autoPlay
                    playsInline
                ></video>
            </Grid>
            <Grid item style={{width: "100%"}}>
                {props.over ? (
                    <Button
                        onClick={() => window.location.reload()}
                        color="primary"
                        variant="contained"
                        classes={{ containedPrimary: classes.button }}
                    >
                        Restart game
                    </Button>
                ) : props.loading ? (
                    <Spinner />
                ) : (
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                        
                    >
                        <Grid item>
                        <Button
                                color="primary"
                                variant="contained"
                                classes={{ containedPrimary: classes.button }}
                            >
                                <HelpIcon/>
                            </Button>
                            
                        </Grid>
                        <Grid item>
                        <Button
                                onClick={props.startGame()}
                                disabled={!ready}
                                color="primary"
                                variant="contained"
                                classes={{ containedPrimary: classes.button }}
                            >
                                <Typography variant="body1">
                                    Start game
                                </Typography>
                            </Button>
                        </Grid>
                    </Grid>
                )}
            </Grid>
        </Grid>
    );
};

export default Menu;
