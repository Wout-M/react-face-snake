import { Fragment } from "react";

import { Typography } from "@mui/material";

import classes from "./Spinner.module.css";

export default function Spinner() {
    return (
        <Fragment>
            <div className={classes.Loader}></div>
            <Typography>Loading face detector...</Typography>
        </Fragment>
    )
}
