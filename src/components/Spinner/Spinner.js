import React, { Fragment } from "react";

import classes from "./Spinner.module.css";

const Spinner = () => (
    <Fragment>
        <div className={classes.Loader}></div>
        <div>Loading the model...</div>
    </Fragment>
);

export default Spinner;
