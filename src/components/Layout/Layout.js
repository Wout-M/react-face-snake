import React from "react";
import Grid from "@material-ui/core/Grid";

import "./Layout.module.css";

const Layout = (props) => {
    return (
        <Grid container direction="row" justify="center" alignItems="center">
            <Grid item>{props.left}</Grid>
            <Grid item>{props.right}</Grid>
        </Grid>
    );
};

export default Layout;
