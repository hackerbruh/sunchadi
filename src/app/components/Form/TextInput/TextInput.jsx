import React from "react";
import cuid from "cuid";

import "./TextInput.css";

const id = cuid();

export default ({
  input,
  width,
  type,
  disabled,
  label,
  meta: { touched, error }
}) => {
  const changeHandler = e => {
    let value = e.target.value;
    if (type === "number") {
      value = +value;
    }
    input.onChange(value);
  };
  return (
    <div>
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        name={input.name}
        type={type}
        width={width}
        value={input.value}
        disabled={disabled}
        autoComplete="off"
        className="input"
        min="0"
        onChange={changeHandler}
      />
      {touched && error && <p className="error">{error}</p>}
    </div>
  );
};
