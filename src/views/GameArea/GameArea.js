import React from "react";

import classes from "./GameArea.module.css"


const GameArea = (props) => {
    return(
        <div className={classes.GameArea}>
            {props.children}
        </div>
    )
}

export default GameArea;