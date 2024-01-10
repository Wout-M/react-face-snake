import classes from "./Food.module.css";

export default function Food(props) {
    return (
        <div
            className={classes.Food}
            style={{ top: `${props.coords[1]}%`, left: `${props.coords[0]}%` }}
        ></div>
    );
};
