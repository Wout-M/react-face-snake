import React, { Fragment } from "react";

import classes from "./Spinner.module.css";
import { Typography } from "@material-ui/core";

const Spinner = () => (
    <Fragment>
        <div className={classes.Loader}></div>
        <Typography>Loading face detector...</Typography>
    </Fragment>
);

export default Spinner;
