import React, { Component } from "react";
import { connect } from "react-redux";

import { updateSelling, deleteSelling } from "../sellingActions";

import SellingItem from "./SellingItem/SellingItem";
import { H1 } from "../../../app/components/Heading/Heading";
import Loader from "../../../app/common/Loader/Loader";

class Sellings extends Component {
  render() {
    if (this.props.loading) {
      return <Loader message="Loading Sellings" />;
    }
    if (this.props.sellings.length < 1) {
      return <h1>No Sellings</h1>;
    }
    const sellings = this.props.sellings.map(selling => (
      <SellingItem
        key={selling.id}
        selling={selling}
        updateselling={this.props.updateSelling}
        deleteselling={this.props.deleteSelling}
      />
    ));
    return (
      <div>
        <H1 center>Sellings</H1>
        <div className="order__header">
          <h3>Customer Name</h3>
          <h3>Selling Date</h3>
          <h3>Total Price</h3>
        </div>
        <div>{sellings}</div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    sellings: state.sellings.sellings,
    loading: state.async.loading
  };
};

const actions = {
  updateSelling,
  deleteSelling
};

export default connect(
  mapState,
  actions
)(Sellings);
