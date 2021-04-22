import React from "react";

import Loader from "../../components/Loader/Loader";
import { H1, H2 } from "../../components/Heading/Heading";

export default ({ message }) => (
  <Loader>
    <Loader.Content>
      <img
        src="/gold.jpg"
        alt="Gold"
        style={{ width: "15rem", borderRadius: "50%" }}
      />
      <H2> Rs. 22000 / 10gm</H2>
      <H1>{message}</H1>
    </Loader.Content>
    <Loader.Spinner />
  </Loader>
);
