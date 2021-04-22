import React from "react";

import cuid from "cuid";

import "./Collapse.css";

const Aux = ({ children }) => children;

const Collapse = ({ children, style }) => (
  <div className="collapse" style={style}>
    {children}
  </div>
);

Collapse.Trigger = ({ children, style }) => {
  const id = cuid();
  return (
    <Aux>
      <input className="collapse__checkbox" type="checkbox" id={id} />
      <label className="collapse__label" htmlFor={id}>
        <div className="collapse__trigger" style={style}>
          {children}
        </div>
      </label>
    </Aux>
  );
};

Collapse.Content = ({ children, style }) => (
  <div className="collapse__content" style={style}>
    {children}
  </div>
);

export default Collapse;
