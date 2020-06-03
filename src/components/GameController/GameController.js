import React, { useEffect, useReducer } from "react";
import GameArea from "../../views/GameArea/GameArea";
import Snake from "../Snake/Snake";
import Food from "../Food/Food";
import { load, predict } from "../../model/facemesh";

const speed = 100;

const DIRECTIONS = {
    up: "UP",
    down: "DOWN",
    left: "LEFT",
    right: "RIGHT",
};

const KEY_CODE_DIRS = {
    37: DIRECTIONS.left,
    38: DIRECTIONS.up,
    39: DIRECTIONS.right,
    40: DIRECTIONS.down,
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
            if (!state.gameOver)
                window.alert(
                    `Game over!\n Your score was ${state.dots.length}`
                );
            return {
                ...state,
                gameOver: true,
            };

        case "START":
            return { ...state, start: true };

        case "SWITCH_INPUT":
            const currentInput = state.useKeys;
            return { ...state, useKeys: !currentInput };
        default:
            throw new Error();
    }
};

const initialState = {
    direction: DIRECTIONS.down,
    dots: [
        [0, 0],
        [0, 2],
        [0, 4],
    ],
    food: foodCoordsHandler(),
    gameOver: false,
    start: false,
    useKeys: true,
};

const GameController = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { start, useKeys } = props;

    const directionHandler = (event) => {
        if (KEY_CODE_DIRS[event.keyCode]) {
            dispatch({
                type: "CHANGE_DIRECTION",
                direction: KEY_CODE_DIRS[event.keyCode],
            });
        }
    };

    useEffect(() => {
        if (state.start) {
            const onTick = () => {
                if (
                    checkSnakeCollapsedHandler(state.dots) ||
                    checkBorderHandler(state.dots[state.dots.length - 1])
                ) {
                    dispatch({ type: "GAME_OVER" });
                } else {
                    dispatch({ type: "MOVE" });
                }
            };

            const interval = setInterval(onTick, speed);

            return () => clearInterval(interval);
        }
    }, [state]);

    useEffect(() => {
        let video = document.getElementById("video");

        if (start) {
            if (useKeys) {
                dispatch({ type: "START" });

                window.addEventListener("keyup", directionHandler, false);

                return () =>  window.removeEventListener("keyup", directionHandler, false);
            } else {
                const model = loadModel();
                model.then((model) => {
                    dispatch({ type: "START" });

                    const onTick = () => {
                        getFaceDirecton(model, video).then((prediction) => {
                            if (prediction) {
                                let direction;

                                const x =(prediction.topLeft[0][0] + prediction.bottomRight[0][0]) / 2;
                                const y =
                                    (prediction.topLeft[0][1] + prediction.bottomRight[0][1]) / 2;

                                const firstVerticalBorder = video.videoWidth / 3;
                                const secondVerticalBorder = (video.videoWidth / 3) * 2;
                                const horizontalBorder = video.videoHeight / 2;

                                if (x <= firstVerticalBorder) {
                                    direction = DIRECTIONS.left;
                                } else if (x >= secondVerticalBorder) {
                                    direction = DIRECTIONS.right;
                                } else if (y >= horizontalBorder) {
                                    direction = DIRECTIONS.down;
                                } else {
                                    direction = DIRECTIONS.up;
                                }

                                dispatch({
                                    type: "CHANGE_DIRECTION",
                                    direction: direction,
                                });
                            }
                        });
                    };
                    const interval = setInterval(onTick, speed);
                    return () => clearInterval(interval);
                });
            } //)
        }
        //}
    }, [start, useKeys]);

    return (
        <GameArea>
            <Snake dots={state.dots} />
            <Food coords={state.food} />
        </GameArea>
    );
};

export default GameController;
