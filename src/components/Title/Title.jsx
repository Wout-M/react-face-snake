import Box from "../Box/Box";
import { Typography } from '@mui/material';
import classes from "./Title.module.css";

export default function Title() {
    return (
        <div className={classes.title}>
            <Box top>
                <Typography variant="h3">Face snake</Typography>
                <Typography>
                    Play snake, with your face as controller
                </Typography>
            </Box>
        </div>
    );
};
