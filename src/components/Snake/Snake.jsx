import Dot from "./Dot/Dot";

export default function Snake(props) {
    return props.dots.map((dot, i) => (
        <Dot
            top={dot[1]}
            left={dot[0]}
            key={i}
            first={i === props.dots.length - 1}
        />
    ));
};
