import React from "react";
import { Link } from "react-router-dom";
import { FaWrench } from "react-icons/fa";

export default ({ id, name, category, price }) => (
  <div className="order__item" style={{ background: "#441678" }}>
    <h3>{name}</h3>
    <h3>{category}</h3>
    <h3>{price}</h3>
    <Link to={"/settings/app/selling-item/" + id}>
      <span style={{ fontSize: "2rem" }}>
        <FaWrench />
      </span>
    </Link>
  </div>
);
