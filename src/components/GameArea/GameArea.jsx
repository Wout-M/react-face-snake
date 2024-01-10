import classes from "./GameArea.module.css";

export default function GameArea(props) {
    return (
        <div className={classes.GameArea}>
            <div className={classes.content}>{props.children}</div>
        </div>
    );
};
