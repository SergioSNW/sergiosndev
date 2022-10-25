import React from "react";
import {createElement} from "../../../../wp-includes/js/dist/vendor/react";

function TestComponent() {
    return {
        React:createElement(
            "div",
            null,
            React.createElement(
                "h3",
                null,
                "Your Border Box"
            ),
            React.createElement(
                "input",
                {type: "text"}
            )),
    }
}

export default TestComponent

