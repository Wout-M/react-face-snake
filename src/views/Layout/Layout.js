import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";

import "./Layout.module.css";
import GameController from "../../components/GameController/GameController";
import Video from "../../components/Video/Video";
import { Button } from "@material-ui/core";

const Layout = () => {
    const [startGame, setStartGame] = useState(false);
    const [canStart, setCanStart] = useState(false);


    const videoReadyHandler= (ready) => {
        console.log(ready)
        setCanStart(ready)
    }

    return (
        <Grid container direction="row" justify="center" alignItems="center">
            <Grid item>
                <Video ready={() => videoReadyHandler(true)}/>
                <Button disabled={!canStart} onClick={() => setStartGame(true)}>Start game</Button>
            </Grid>
            <Grid item>
            <GameController start={startGame}/>
            <p>{startGame}</p>

            </Grid>
        </Grid>
    );
};

export default Layout;
