import React from "react";
import { FaPencilAlt } from "react-icons/fa";
import { Link, withRouter } from "react-router-dom";

import "./OrderItem.css";

import Collapse from "../../../../app/components/Collapse/Collapse";
import Button from "../../../../app/components/Button/Button";

export default withRouter(({ order, updateOrder, deleteOrder, history }) => {
  const {
    id,
    name,
    orderedDate,
    submitDate,
    worker,
    wages,
    total,
    rate,
    weight,
    loss,
    item,
    completed,
    description
  } = order;
  return <div>
      <Collapse>
        <Collapse.Trigger>
          <div className="order__item" style={{ background: completed ? "#441678" : "#ef9118" }}>
            <h3>{name}</h3>
            <h3>{orderedDate}</h3>
            <h3>{submitDate}</h3>
            <Link to={"/order/" + id}>
              <span style={{ fontSize: "2rem" }}>
                <FaPencilAlt />
              </span>
            </Link>
          </div>
        </Collapse.Trigger>
        <Collapse.Content>
          <div className="order__info">
            <table className="order__info--table">
              <tbody>
                <tr>
                  <td>Cusomter Name</td>
                  <th>{name}</th>
                </tr>
                <tr>
                  <td>Ordered Date</td>
                  <th>{orderedDate}</th>
                </tr>
                <tr>
                  <td>Submit Date</td>
                  <th>{submitDate}</th>
                </tr>
                <tr>
                  <td>Assigned Worker</td>
                  <th>{worker}</th>
              </tr>
              <tr>
                <td>Item name</td>
                <th>{item}</th>
              </tr>
                <tr>
                  <td>Rate</td>
                  <th>{rate}</th>
                </tr>
                <tr>
                  <td>Weight</td>
                  <th>{weight}</th>
                </tr>
                <tr>
                  <td>Loss</td>
                  <th>{loss}</th>
                </tr>
                <tr>
                  <td>Wages</td>
                  <th>{wages}</th>
                </tr>
                <tr>
                  <td>Total</td>
                  <th>{total}</th>
                </tr>
                <tr>
                  <td>Description</td>
                  <th style={{ width: "300px" }}>{description}</th>
                </tr>
              </tbody>
            </table>
            <Button btnStyle="primary" type="button" style={{ width: "30rem", margin: "0 2rem", marginLeft: "5rem" }} onClick={() => updateOrder({ ...order, completed: !completed }, history)}>
              {completed ? "Mark As Pending" : "Mark As Done"}
            </Button>
            <Button btnStyle="danger" type="button" style={{ width: "30rem" }} onClick={() => deleteOrder(id, history)}>
              Delete Order
            </Button>
          </div>
        </Collapse.Content>
      </Collapse>
    </div>;
});
