import classes from "./Box.module.css";

export default function Box(props) {
    let style = [classes.rounding];

    props.top && style.push(classes.top);
    props.bottom && style.push(classes.bottom);

    return <div className={style.join(" ")}>{props.children}</div>;
};

