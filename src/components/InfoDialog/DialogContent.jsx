import directions from "../../assets/images/directions.png";
import food from "../../assets/images/food.png";
import snake from "../../assets/images/snake.png";

const content = [
    {
        img: { snake },
        title: "Snake",

        text: `Move the snake around to gather food. Don't move into the border or it's game over...`,
    },
    {
        img: { food },
        title: "Food",

        text: `Gather food with the snake by moving to it. Each time you eat some food your snake will grow and you'll get 1 extra point`,
    },
    {
        img: { directions },
        title: "Controlling the snake",

        text: `Let the snake move in a certain direction by moving your head in the correct place in the camera`,
    },
];

export default content;
