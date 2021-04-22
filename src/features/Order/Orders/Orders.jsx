import React, { Component } from "react";
import { connect } from "react-redux";

import { updateOrder, deleteOrder } from "../orderActions";

import OrderItem from "./OrderItem/OrderItem";
import { H1 } from "../../../app/components/Heading/Heading";
import Loader from "../../../app/common/Loader/Loader";

class Orders extends Component {
  render() {
    if (this.props.loading) {
      return <Loader message="Loading Orders" />;
    }
    if (this.props.orders.length < 1) {
      return <h1>No Orders</h1>
    }
    const orders = this.props.orders.map(order => (
      <OrderItem
        key={order.id}
        order={order}
        updateOrder={this.props.updateOrder}
        deleteOrder={this.props.deleteOrder}
      />
    ));
    return (
      <div>
        <H1 center>Orders</H1>
        <div className="order__info--chart">
          <div className="order__info--item">
            <div className="order__info--item__box" />
            <p className="order__info--item__text">Done</p>
          </div>
          <div className="order__info--item">
            <div className="order__info--item__box" />
            <p className="order__info--item__text">Pending</p>
          </div>
        </div>
        <div className="order__header">
          <h3>Customer Name</h3>
          <h3>Ordered Date</h3>
          <h3>Submit Date</h3>
          <h3>Edit</h3>
        </div>
        <div>{orders}</div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    orders: state.orders.orders,
    loading: state.async.loading
  };
};

const actions = {
  updateOrder,
  deleteOrder
};

export default connect(
  mapState,
  actions
)(Orders);
