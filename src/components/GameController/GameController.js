import React, { useEffect, useReducer } from "react";
import GameArea from "../../views/GameArea/GameArea";
import Snake from "../Snake/Snake";
import Food from "../Food/Food";

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
                food: foodCoords
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

        case "RESTART":
            return { initialState };
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
};

const GameController = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        window.addEventListener("keydown", directionHandler, false);

        return () =>
            window.removeEventListener("keydown", directionHandler, false);
    }, []);

    const directionHandler = (event) => {
        if (KEY_CODE_DIRS[event.keyCode]) {
            dispatch({
                type: "CHANGE_DIRECTION",
                direction: KEY_CODE_DIRS[event.keyCode],
            });
        }
    };

    useEffect(() => {
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

        const interval = setInterval(onTick, 100);

        return () => clearInterval(interval);
    }, [state]);

    return (
        <GameArea>
            <Snake dots={state.dots} />
            <Food coords={state.food} />
        </GameArea>
    );
};

export default GameController;
