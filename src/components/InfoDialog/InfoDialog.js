import React, { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

import content from "./DialogContent";

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: "absolute",
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton
                    aria-label="close"
                    className={classes.closeButton}
                    onClick={onClose}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const useStyles = makeStyles((theme) => ({
    img: {
        maxWidth: "300px",
        borderRadius: "24px",
    },
    button: {
        color: "#6420f5",
        "&:hover": {
            color: "#000094",
        },
    },
}));

const InfoDialog = (props) => {
    const classes = useStyles();
    const [contentIndex, setContentIndex] = useState(0);

    const previousContentHandler = () => {
        setContentIndex((prevIndex) => (prevIndex - 1) % 3);
    };

    const nextContentHandler = () => {
        setContentIndex((prevIndex) => (prevIndex + 1) % 3);
    };

    return (
        <Dialog
            onClose={props.closing}
            aria-labelledby="customized-dialog-title"
            open={props.open}
        >
            <DialogTitle id="customized-dialog-title" onClose={props.closing}>
                How does this thing work?
            </DialogTitle>
            <DialogContent dividers>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Grid item xs={1}>
                        <IconButton
                            color="primary"
                            variant="contained"
                            onClick={previousContentHandler}
                        >
                            <ArrowBackIosIcon
                                fontSize="large"
                                className={classes.button}
                            />
                        </IconButton>
                    </Grid>
                    <Grid item xs={10}>
                        <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="center"
                        >
                            <Grid item>
                                <img
                                    src={Object.values(content[contentIndex].img)[0]}
                                    alt={content[contentIndex].title}
                                    className={classes.img}
                                />
                            </Grid>
                            <Grid item>
                                <Typography variant="h6">
                                    {content[contentIndex].title}
                                </Typography>
                                <Typography>
                                    {content[contentIndex].text}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={1}>
                        <IconButton
                            color="primary"
                            variant="contained"
                            onClick={nextContentHandler}
                        >
                            <ArrowForwardIosIcon
                                fontSize="large"
                                className={classes.button}
                            />
                        </IconButton>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
};

export default InfoDialog;
