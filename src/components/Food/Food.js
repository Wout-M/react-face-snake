import React from "react";
import classes from "./Food.module.css";

const Food = (props) => {
    return (
        <div
            className={classes.Food}
            style={{ top: `${props.coords[1]}%`, left: `${props.coords[0]}%` }}
        ></div>
    );
};

export default Food;
