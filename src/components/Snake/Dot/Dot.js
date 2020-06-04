import React from "react";
import classes from "./Dot.module.css";

const Dot = (props) => {
    return (
        <div
            className={props.first ? classes.First : classes.Dot}
            style={{ top: `${props.top}%`, left: `${props.left}%` }}
        ></div>
    );
};

export default Dot;
