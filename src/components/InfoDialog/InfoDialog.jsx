import { useState } from "react";

import { Dialog, DialogTitle, DialogContent, Grid, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import classes from "./InfoDialog.module.css"
import content from "./DialogContent";

export default function InfoDialog(props) {
    const [contentIndex, setContentIndex] = useState(0);

    const previousContentHandler = () => {
        contentIndex === 0
            ? setContentIndex(2)
            : setContentIndex((prevIndex) => (prevIndex - 1) % 3);
    };

    const nextContentHandler = () => {
        setContentIndex((prevIndex) => (prevIndex + 1) % 3);
    };

    return (
        <Dialog
            aria-labelledby="customized-dialog-title"
            open={props.open}
        >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                How does this thing work?
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={props.closing}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent dividers>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
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
                            />
                        </IconButton>
                    </Grid>
                    <Grid item xs={10}>
                        <Grid
                            container
                            direction="column"
                            justifyContent="center"
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
                            />
                        </IconButton>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    )
};
