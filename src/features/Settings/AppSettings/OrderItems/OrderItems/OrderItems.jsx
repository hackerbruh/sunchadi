import React, { Component } from "react";
import { connect } from "react-redux";

import OrderListItem from "./OrderListItem/OrderListItem";
import { H1 } from "../../../../../app/components/Heading/Heading";
import Loader from "../../../../../app/common/Loader/Loader";

class OrderItems extends Component {
  render() {
    const { items, loading } = this.props;
    const itemList = items.map(item => (
      <OrderListItem key={item.id} {...item} />
    ));
    let content = (
      <div>
        <H1 center style={{ marginBottom: "1.5rem" }}>
          Order Items
        </H1>
        <div className="order__header">
          <h3>Name</h3>
          <h3>Category</h3>
          <h3>Price</h3>
          <h3>Edit</h3>
        </div>
        <div>{itemList}</div>
      </div>
    );

    if (loading) {
      content = <Loader message="Loading Items" />;
    }
    if (itemList.length < 1) {
      content = <H1 center>No Order Items</H1>;
    }
    return <div>{content}</div>;
  }
}

const mapState = state => {
  return {
    loading: state.async.loading,
    items: state.config.orderItems
  };
};

const actions = {};

export default connect(
  mapState,
  actions
)(OrderItems);
