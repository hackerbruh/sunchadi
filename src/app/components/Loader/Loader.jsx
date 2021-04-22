import React from "react";

import "./Loader.css";

const Loader = ({ children, style }) => (
  <div className="loader" style={style}>
    {children}
  </div>
);

Loader.Content = ({ children, style }) => (
  <div className="loader__content" style={style}>
    {children}
  </div>
);

Loader.Spinner = ({ children, style }) => (
  <div className="loader__spinner" style={style}>
    {children ? (
      children
    ) : (
      <div className="loader__spinner--loading">
        <div />
        <div />
      </div>
    )}
  </div>
);

export default Loader;
