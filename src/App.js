import React, { Fragment } from "react";
import GameController from "./components/GameController/GameController";
import Title from "./components/Title/Title";
import Footer from "./components/Footer/Footer";
import classes from "./App.module.css";

function App() {
    return (
        <div className={classes.container}>
            <div className={classes.content}>
                <Title />
                <GameController />
            </div>
            <Footer />
        </div>
    );
}

export default App;
