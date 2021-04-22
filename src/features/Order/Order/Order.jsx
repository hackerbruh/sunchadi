import React, { Component } from "react";
import { Field, reduxForm, formValueSelector } from "redux-form";
import { connect } from "react-redux";

import { placeOrder, updateOrder } from "../orderActions";
import validate from "../../../app/config/validation";

import Grid from "../../../app/components/Grid/Grid";
import DropDown from "../../../app/components/Form/DropDown/DropDown";
import { H1 } from "../../../app/components/Heading/Heading";
import Div from "../../../app/common/Div/Div";
import Loader from "../../../app/common/Loader/Loader";
import Button from "../../../app/components/Button/Button";
import TextInput from "../../../app/components/Form/TextInput/TextInput";
import TextArea from "../../../app/components/Form/TextArea/TextArea";

class Order extends Component {
  state = {
    weight: 0,
    loss: 0,
    wages: 0,
    workerId: null
  };
  handleWorkerChange = id => {
    this.setState({
      workerId: id
    });
  };
  handleTypeSelect = name => {
    console.log(name)
    const rate = this.props.applyRates[name];
    this.props.change("rate", rate);
  };
  handleOrderPlace = values => {
    values.weight = +values.weight;
    values.wages = +values.wages;

    if (this.props.initialValues.id) {
      return this.props.updateOrder(
        {
          ...values,
          id: this.props.match.params.id,
          workerId: this.state.workerId
        },
        this.props.history
      );
    }
    values.completed = false;
    values.orderedDate = new Date().toLocaleDateString();
    const splitedDate = values.orderedDate.split("/");
    const formatedDate =
      splitedDate[2] + "-" + splitedDate[0] + "-" + splitedDate[1];
    values.orderedDate = formatedDate;
    this.props.placeOrder(values, this.props.history);
  };
  handleInputChange = (e, value, _, name) => {
    this.setState({
      [name]: +value
    });
    const { weight, loss, wages } = this.state;
    const rate = this.props.rate;
    let total = 0;
    switch (name) {
      case "weight":
        total = rate * (+value / 10 + loss / 10) + wages;
        break;
      case "loss":
        total = rate * (weight / 10 + +value / 10) + wages;
        break;
      case "wages":
        total = rate * (weight / 10 + loss / 10) + +value;
        break;
      default:
        total = 0;
    }
    this.props.change("total", total);
  };
  render() {
    const { handleSubmit, loading } = this.props;
    if (loading) {
      return <Loader message="Processing Action" />;
    }
    return (
      <Div>
        <H1 center>Place Order</H1>
        <form>
          <Grid gutterWidth="4rem">
            <Grid.Row columns={2}>
              <Grid.Column>
                <Field
                  name="name"
                  type="text"
                  label="Customer Name"
                  options={this.props.customers}
                  component={DropDown}
                />
                <Field
                  name="submitDate"
                  type="date"
                  label="Submit Date"
                  component={TextInput}
                />
                <Field
                  name="description"
                  type="text"
                  label="Description"
                  component={TextArea}
                />
                {this.props.initialValues.id && (
                  <Field
                    name="worker"
                    type="text"
                    label="Assign Worker"
                    options={this.props.workers}
                    getSelectedId={id => this.handleWorkerChange(id)}
                    component={DropDown}
                  />
                )}
                <Field
                  name="item"
                  type="text"
                  label="Item Name"
                  component={TextInput}
                />
              </Grid.Column>
              <Grid.Column>
                <Field
                  name="type"
                  type="text"
                  label="Item Type"
                  options={this.props.rates}
                  getSelectedValue={this.handleTypeSelect}
                  component={DropDown}
                />
                <Field
                  disabled={true}
                  name="rate"
                  type="number"
                  label="Rate"
                  component={TextInput}
                />
                <Field
                  name="weight"
                  type="number"
                  label="Weight"
                  onChange={this.handleInputChange}
                  component={TextInput}
                />
                <Field
                  name="loss"
                  type="number"
                  label="Loss"
                  onChange={this.handleInputChange}
                  component={TextInput}
                />
                <Field
                  name="wages"
                  type="number"
                  label="Wages"
                  onChange={this.handleInputChange}
                  component={TextInput}
                />
                <Field
                  name="total"
                  disabled={true}
                  type="number"
                  label="Total"
                  component={TextInput}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Button
            type="submit"
            btnStyle="primary"
            style={{ width: "4rem !important" }}
            onClick={handleSubmit(this.handleOrderPlace)}
          >
            {this.props.match.params.id ? "Update Order" : "Place Order"}
          </Button>
        </form>
      </Div>
    );
  }
}

const mapState = (state, props) => {
  const id = props.match.params.id;
  let order = {};
  if (state.orders.orders.length > 0) {
    order = state.orders.orders.find(c => c.id === id);
  }
  return {
    applyRates: state.config.rates,
    rates: Object.keys(state.config.rates).map(type => ({
      id: type,
      label: type,
      value: type,
      rate: state.config.rates[type]
    })),
    rate: formValueSelector("orderForm")(state, "rate"),
    loading: state.async.loading,
    initialValues: order === undefined ? {} : order,
    customers: state.customers.customers.map(customer => ({
      id: customer.id,
      label: customer.name,
      value: customer.name
    })),
    items: state.config.orderItems.map(i => ({
      id: i.id,
      label: i.name,
      value: i.name,
      price: i.price
    })),
    workers: state.workers.workers.map(worker => ({
      id: worker.id,
      label: worker.name,
      value: worker.name
    }))
  };
};

const actions = { placeOrder, updateOrder };

export default connect(
  mapState,
  actions
)(
  reduxForm({
    form: "orderForm",
    enableReinitialize: true,
    validate: validate.orderValidation
  })(Order)
);
