import React from "react";

import classes from "./GameArea.module.css"


const GameArea = (props) => {

    return(
        <div className={classes.GameArea} >
            <div className={classes.content}>
            {props.children}

            </div>
        </div>
    )
}

export default GameArea;