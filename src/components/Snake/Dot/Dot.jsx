import classes from "./Dot.module.css";

export default function Dot(props) {
    return (
        <div
            className={props.first ? classes.First : classes.Dot}
            style={{ top: `${props.top}%`, left: `${props.left}%` }}
        ></div>
    );
};
