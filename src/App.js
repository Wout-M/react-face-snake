import React, { useState } from "react";

import GameController from "./components/GameController/GameController";
import Title from "./components/Title/Title";
import Footer from "./components/Footer/Footer";
import classes from "./App.module.css";
import InfoDialog from "./components/InfoDialog/InfoDialog";

function App() {
    const [open, setOpen] = useState(false);

    const openDialogHandler = () => {
        setOpen(true);
    };

    const closeDialogHandler = () => {
        setOpen(false);
    };

    return (
        <div className={classes.container}>
            <div className={classes.content}>
                <Title />
                <GameController openDialog={openDialogHandler} />
            </div>
            <Footer />
            <InfoDialog closing={closeDialogHandler} open={open} />
        </div>
    );
}

export default App;
