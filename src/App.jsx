import { useState } from "react";

import { createTheme, ThemeProvider } from '@mui/material/styles';

import GameController from "./components/GameController/GameController";
import Title from "./components/Title/Title";
import Footer from "./components/Footer/Footer";
import classes from "./App.module.css";
import InfoDialog from "./components/InfoDialog/InfoDialog";

const theme = createTheme({
    palette: {
        primary: {
            main: "#6420f5"
        }
    }
});

export default function App(props) {
    const [open, setOpen] = useState(false);

    const openDialogHandler = () => {
        setOpen(true);
    };

    const closeDialogHandler = () => {
        setOpen(false);
    };

    return (
        <div className={classes.container}>
            <ThemeProvider theme={theme}>
                <div className={classes.content}>
                    <Title />
                    <GameController openDialog={openDialogHandler} {...props}/>
                </div>
                <Footer {...props}/>
                <InfoDialog closing={closeDialogHandler} open={open} {...props} />
            </ThemeProvider>
        </div>
    );
}
