import React from "react";

import "./Input.css";

const Input = ({ children, style, onChange, ...props }) => (
  <input className="input" {...props} onChange={onChange} />
);

export default Input;
