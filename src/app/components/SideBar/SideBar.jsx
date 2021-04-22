import React from "react";

import "./SideBar.css";

const SideBar = ({ children, style }) => (
  <div className="sidebar" style={style}>
    {children}
  </div>
);

SideBar.Header = ({ children, style }) => (
  <div className="sidebar__header" style={style}>
    {children}
  </div>
);

SideBar.Content = ({ children, style }) => (
  <div className="sidebar__content" style={style}>
    {children}
  </div>
);

SideBar.Footer = ({ children, style }) => (
  <div className="sidebar__footer" style={style}>
    {children}
  </div>
);

export default SideBar;
