import React from "react";
import Box from "../Box/Box";
import { Typography } from "@material-ui/core";
import classes from "./Title.module.css";

const Title = () => {
    return (
        <div className={classes.title}>
            <Box top>
                <Typography variant="h3">Face snake</Typography>
                <Typography variant="subtitle2s">Play snake with your face as controller</Typography>
            </Box>
        </div>
    );
};

export default Title;
