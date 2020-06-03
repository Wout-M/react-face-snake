import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";

import "./Layout.module.css";
import GameController from "../../components/GameController/GameController";
import Video from "../../components/Video/Video";
import { Button } from "@material-ui/core";

const Layout = () => {
    const [startGame, setStartGame] = useState(false);
    const [canStart, setCanStart] = useState(false);
    const [useKeys, setUseKeys] = useState(true)

    return (
        <Grid container direction="row" justify="center" alignItems="center">
            <Grid item>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    <Grid item>
                        <Video ready={() => setCanStart(true)} />
                    </Grid>
                    <Grid item>
                        <Button
                            disabled={!canStart}
                            onClick={() => setStartGame(true)}
                        >
                            Start game
                        </Button>
                        <Button onClick={() => setUseKeys(currInput => !currInput)} disabled={startGame}>
                            {useKeys ? "Using keys" : "Using face"}
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <GameController start={startGame} useKeys={useKeys}/>
            </Grid>
        </Grid>
    );
};

export default Layout;
