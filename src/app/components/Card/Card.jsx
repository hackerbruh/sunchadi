import React from "react";

import "./Card.css";

const Card = ({ children, style }) => (
  <div className="card" style={style}>
    {children}
  </div>
);

Card.Thumbnail = ({ children, style, thumbnail }) => (
  <div className="card__thumbnail" style={style}>
    <img className="card__thumbnail--image" src={thumbnail} alt="Customer" />
    {children}
  </div>
);

Card.Title = ({ children, style }) => (
  <div className="card__title" style={style}>
    {children}
  </div>
);

Card.SubTitle = ({ children, style }) => (
  <div className="card__subtitle" style={style}>
    {children}
  </div>
);

export default Card;
