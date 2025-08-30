import React from "react";

export default function Button({
    text,
    type = "button",
    className = "",
    ...props
}) {
    return (
        <button className={`px-1 py-0.5 sm:rounded-lg ${className}`} {...props}>
            {text}
        </button>
    );
}