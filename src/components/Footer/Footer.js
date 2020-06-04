import React from "react";
import Box from "../Box/Box";
import { Typography, Grid, IconButton, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles((theme) => ({
    container: {
        width: "100%",
        position: "absolute",
        bottom: "0px",
    },
    footer: {
        width: "70%",
        margin: "auto",
    },
    button: {
        color: "#6420f5",
        "&:hover": {
            color: "#000094",
        },
    },
}));

const Footer = () => {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <div className={classes.footer}>
                <Box bottom>
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                    >
                        <Grid item>
                            <Typography variant="body1">
                                © {new Date().getFullYear()} Wout Mergaerts
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Link
                                href="https://woutmergaerts.com/"
                                target="_blank"
                            >
                                <IconButton color="primary" variant="contained">
                                    <AccountCircleIcon
                                        fontSize="large"
                                        className={classes.button}
                                    />
                                </IconButton>
                            </Link>
                            <Link
                                href="https://www.linkedin.com/in/wout-mergaerts/"
                                target="_blank"
                            >
                                <IconButton color="primary" variant="contained">
                                    <LinkedInIcon
                                        fontSize="large"
                                        className={classes.button}
                                    />
                                </IconButton>
                            </Link>
                            <Link
                                href="https://github.com/Wout-M"
                                target="_blank"
                            >
                                <IconButton color="primary" variant="contained">
                                    <GitHubIcon
                                        fontSize="large"
                                        className={classes.button}
                                    />
                                </IconButton>
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </div>
    );
};

export default Footer;
