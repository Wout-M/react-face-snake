import React from "react";
import Dot from "./Dot/Dot";

const Snake = (props) => {
    return props.dots.map((dot, i) => (
        <Dot top={dot[1]} left={dot[0]} key={i} />
    ));
};

export default Snake;
