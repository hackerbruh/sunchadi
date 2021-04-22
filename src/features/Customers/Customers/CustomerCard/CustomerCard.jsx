import React from "react";
import { Link } from "react-router-dom";

import Card from "../../../../app/components/Card/Card";

const Customer = ({ id, photoURI, name, address }) => (
  <Link to={`/customer/${id}`}>
    <Card>
      <Card.Thumbnail thumbnail={photoURI || "/customer.jpeg"}>
        {""}
      </Card.Thumbnail>
      <Card.Title>{name}</Card.Title>
      <Card.SubTitle>{address}</Card.SubTitle>
    </Card>
  </Link>
);

export default Customer;
