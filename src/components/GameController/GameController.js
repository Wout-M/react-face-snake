import React, { useEffect, useReducer, useState } from "react";

import GameArea from "../GameArea/GameArea";
import Snake from "../Snake/Snake";
import Food from "../Food/Food";
import Grid from "@material-ui/core/Grid";
import { load, predict } from "../../model/facemesh";
import Menu from "../Menu/Menu";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "../Box/Box"

const fps = 10;

const DIRECTIONS = {
    up: "UP",
    down: "DOWN",
    left: "LEFT",
    right: "RIGHT",
};

const foodCoordsHandler = () => {
    const min = 1;
    const max = 98;
    const x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
    const y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
    return [x, y];
};

const moveHeadHandler = (direction, head) => {
    switch (direction) {
        case DIRECTIONS.up:
            return [head[0], head[1] - 2];
        case DIRECTIONS.down:
            return [head[0], head[1] + 2];
        case DIRECTIONS.left:
            return [head[0] - 2, head[1]];
        case DIRECTIONS.right:
            return [head[0] + 2, head[1]];
        default:
            throw new Error();
    }
};

const checkBorderHandler = (head) =>
    head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0;

const checkSnakeCollapsedHandler = (dots) => {
    const snake = dots.slice(0, dots.length - 1);
    const head = dots[dots.length - 1];
    let isCollapsed = false;

    snake.forEach((dot) => {
        if (head[0] === dot[0] && head[1] === dot[1]) {
            isCollapsed = true;
        }
    });

    return isCollapsed;
};

const checkEatingHandler = (head, food) =>
    head[0] === food[0] && head[1] === food[1];

const enlargeSnakeHandler = (snake) => {
    let newSnake = [...snake];
    newSnake.unshift([]);
    return newSnake;
};

const loadModel = async () => {
    return await load();
};

const getFaceDirecton = async (model, video) => {
    return await predict(model, video);
};

const reducer = (state, action) => {
    switch (action.type) {
        case "CHANGE_DIRECTION":
            return {
                ...state,
                direction: action.direction,
            };

        case "MOVE":
            let snake = state.dots;
            let head = snake[snake.length - 1];
            const isEating = checkEatingHandler(head, state.food);

            const foodCoords = isEating ? foodCoordsHandler() : state.food;

            if (isEating) snake = enlargeSnakeHandler(snake);

            head = moveHeadHandler(state.direction, head);
            snake.push(head);
            snake.shift();

            return {
                ...state,
                dots: snake,
                food: foodCoords,
            };

        case "GAME_OVER":
            return {
                ...state,
                gameOver: true,
                started: false,
            };

        case "START":
            return { ...state, started: true };

        default:
            throw new Error();
    }
};

const initialState = {
    direction: DIRECTIONS.down,
    dots: [
        [50, 50],
        [50, 52],
        [50, 54],
    ],
    food: foodCoordsHandler(),
    gameOver: false,
    started: false,
    canStart: false,
};

const useStyles = makeStyles((theme) => ({
    root: {
        padding: "30px",
        margin: "auto",
        maxWidth: "1400px",
    }
}));

const GameController = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [start, setStart] = useState(false);
    const [direction, setDirection] = useState(DIRECTIONS.down);
    const [loading, setLoading] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        if (state.started) {
            const moveSnake = () => {
                if (
                    checkSnakeCollapsedHandler(state.dots) ||
                    checkBorderHandler(state.dots[state.dots.length - 1])
                ) {
                    dispatch({ type: "GAME_OVER" });
                    setStart(false);
                } else {
                    dispatch({ type: "MOVE" });
                }
            };

            const interval = setTimeout(moveSnake, 1000 / fps);

            return () => clearTimeout(interval);
        }
    }, [state]);

    useEffect(() => {
        let video = document.getElementById("video");
        if (start) {
            const getPrediction = async () => {
                const model = loadModel();
                model.then((model) => {
                    dispatch({ type: "START" });

                    const getDirecton = () => {
                        getFaceDirecton(model, video).then((response) => {
                            setLoading(false);
                            response && setDirection(response);
                        });
                    };

                    const interval = setInterval(getDirecton, 1000 / fps);
                    return () => clearInterval(interval);
                });
            };
            getPrediction();
        }
    }, [start]);

    useEffect(() => {
        dispatch({
            type: "CHANGE_DIRECTION",
            direction: direction,
        });
    }, [direction]);

    const startGameHandler = () => {
        setStart(true);
        setLoading(true);
    };

    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-start"
            className={classes.root}
        >
            <Grid item md>
                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="center"
                >
                    <Grid item>
                        <Box>
                            <Menu
                                startGame={() => startGameHandler}
                                started={state.started}
                                keys={state.useKeys}
                                over={state.gameOver}
                                loading={loading}
                            />
                        </Box>
                    </Grid>
                    <Grid item>
                        <Box>
                            <Typography variant="h5">Your score: {state.dots.length - 3}</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item md={8}>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="flex-end"
                >
                    <Box>
                        {state.gameOver ? (
                            <p>Game over!</p>
                        ) : (
                            <GameArea>
                                <Snake dots={state.dots} />
                                <Food coords={state.food} />
                            </GameArea>
                        )}
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default GameController;
