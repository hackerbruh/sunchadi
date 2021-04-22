import React, { Component } from "react";
import { connect } from "react-redux";

import SellingListItem from "./SellingListItem/SellingListItem";
import { H1 } from "../../../../../app/components/Heading/Heading";
import Loader from "../../../../../app/common/Loader/Loader";

class SellingItems extends Component {
  render() {
    const { items, loading } = this.props;
    const itemList = items.map(item => (
      <SellingListItem key={item.id} {...item} />
    ));
    let content = (
      <div>
        <H1 center style={{ marginBottom: "1.5rem" }}>
          Selling Items
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

    if (itemList.length < 1) {
      content = <H1 center>No Selling Items</H1>;
    }

    if (loading) {
      content = <Loader message="Loading Items" />;
    }

    return <div>{content}</div>;
  }
}

const mapState = state => {
  return {
    loading: state.async.loading,
    items: state.config.sellingItems
  };
};

const actions = {};

export default connect(
  mapState,
  actions
)(SellingItems);
