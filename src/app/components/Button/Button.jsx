import React from "react";

import "./Button.css";

export default ({ children, type, style, btnStyle, onClick, disabled }) => {
  const classes = ["button", btnStyle];
  if (disabled) classes.push("btn-disabled");
  return (
    <button
      className={classes.join(" ")}
      disabled={disabled}
      {...{ type, style }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
