import React, { Component } from "react";
import { connect } from "react-redux";

import Grid from "../../../app/components/Grid/Grid";
import Loader from "../../../app/common/Loader/Loader";
import Input from "../../../app/components/Input/Input";

import Customer from "./CustomerCard/CustomerCard";

import { searchCustomer } from "../customerActions";

class Customers extends Component {
  state = {
    term: ""
  };

  render() {
    const { term } = this.state;
    let { customers, searchedCustomers, loading, error } = this.props;
    if (error) {
      return <div>Inernet Connection Error</div>;
    }
    if (loading) {
      return <Loader message="Loading Customers" />;
    }
    if (searchedCustomers.length > 0) {
      customers = searchedCustomers;
    }

    let customersGrid = customers.map(({ id, photoURI, name, address }) => (
      <Grid.Column key={id}>
        <Customer {...{ id, photoURI, name, address }} />
      </Grid.Column>
    ));

    if (term !== "" && searchedCustomers.length < 1) {
      customersGrid = [];
    }

    if (customersGrid.length < 1) {
      customersGrid = <div>No Customers</div>;
    }

    return (
      <Grid gutterWidth="0rem">
        <Input
          onChange={e => {
            this.setState({ term: e.target.value });
            this.props.searchCustomer(e.target.value);
          }}
        />
        <div style={{ height: "100vh", overflow: "scroll" }}>
          <Grid.Row columns={3}>{customersGrid}</Grid.Row>
        </div>
      </Grid>
    );
  }
}

const mapState = ({
  customers: { customers, searchedCustomers },
  async: { loading, error }
}) => ({
  customers,
  searchedCustomers,
  loading,
  error
});

const actions = {
  searchCustomer
};

export default connect(
  mapState,
  actions
)(Customers);
