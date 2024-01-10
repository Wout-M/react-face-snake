import { Typography, Grid, IconButton, Link } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import classes from "./Footer.module.css"
import Box from "../Box/Box";

export default function Footer() {
    return (
        <div className={classes.container}>
            <div className={classes.footer}>
                <Box bottom>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
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
