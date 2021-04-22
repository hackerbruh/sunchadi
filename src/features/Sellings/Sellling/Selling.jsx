import React, { Component } from "react";
import { Field, reduxForm, reset } from "redux-form";
import { connect } from "react-redux";
import { FaTrash, FaPencilAlt } from "react-icons/fa";

import { addSelling } from "../sellingActions";
import validate from "../../../app/config/validation";

import Button from "../../../app/components/Button/Button";
import TextInput from "../../../app/components/Form/TextInput/TextInput";
import Grid from "../../../app/components/Grid/Grid";

import AddToSellingForm from "./AddItemForm/AddItemForm";

class Selling extends Component {
  state = {
    items: [],
    itemsError: false,
    itemExists: false,
    currentSelectedItem: {}
  };
  deleteItem = id => {
    const newItems = this.state.items.filter(item => item.id !== id);
    this.setState({
      items: newItems
    });
    let total = 0;
    for (let item of newItems) {
      total += item.price;
    }
    this.props.change("total", total.toFixed(2));
  };
  updateItem = item => {
    this.setState({
      itemExists: false
    })
    const newItems = this.state.items.map(i => {
      if (i.id === item.id) {
        return item;
      }
      return i;
    });
    this.setState({
      currentSelectedItem: {},
      items: newItems
    });
    let total = 0;
    for (let item of newItems) {
      total += item.price;
    }
    this.props.change("total", total.toFixed(2));
  };
  setItem = id => {
    this.setState({
      currentSelectedItem: this.state.items.find(i => i.id === id)
    });
  };
  handleItemAdd = item => {
    this.setState({ 
      itemExists: false
    })
    const itemExists = this.state.items.find(i => i.code === item.code);
    if (itemExists) {
      return this.setState({
        itemExists: true
      });
    }
    const newItems = [...this.state.items, item];
    this.setState({
      items: newItems
    });
    let total = 0;
    for (let item of newItems) {
      total += item.price;
    }
    this.props.change("total", total.toFixed(2));
  };
  handleSellItem = values => {
    if (this.state.items.length < 1) {
      return this.setState({
        itemsError: true
      });
    }
    values.items = this.state.items;
    values.soldDate = new Date().toLocaleDateString();
    this.props.addSelling(values, this.props.history);
  };
  render() {
    return (
      <div>
        <Grid>
          <Grid.Row columns={4}>
            <Grid.Column span={3}>
              <form>
                <Field
                  name="cust_name"
                  type="tetxt"
                  label="Customer Name"
                  component={TextInput}
                />
                <Grid>
                  <Grid.Row columns={2}>
                    <Grid.Column>
                      <Field
                        name="address"
                        type="text"
                        label="Customer Address"
                        component={TextInput}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Field
                        name="contact"
                        type="number"
                        label="Customer Phone"
                        component={TextInput}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                {this.state.items.length > 0 && (
                  <div>
                    <div className="order__header">
                      <h3>Code</h3>
                      <h3>Weight</h3>
                      <h3>Loss</h3>
                      <h3>Name</h3>
                      <h3>Edit</h3>
                      <h3>Delete</h3>
                    </div>
                    {this.state.items.map(item => (
                      <div
                        key={item.code}
                        className="order__item"
                        style={{ background: "#441678" }}
                      >
                        <h3>{item.code}</h3>
                        <h3>{item.finalWt}</h3>
                        <h3>{item.loss}</h3>
                        <h3>{item.name}</h3>
                        <h3
                          style={{ cursor: "pointer" }}
                          onClick={() => this.setItem(item.id)}
                        >
                          <FaPencilAlt />
                        </h3>
                        <h3
                          style={{ cursor: "pointer" }}
                          onClick={() => this.deleteItem(item.id)}
                        >
                          <FaTrash />
                        </h3>
                      </div>
                    ))}
                  </div>
                )}
                {this.state.itemsError && (
                  <p className="error">At Least One Item Is Required</p>
                )}
                <Field
                  name="total"
                  disabled={true}
                  type="number"
                  label="Total"
                  component={TextInput}
                />
                {this.state.itemExists && <p className="error">Item Already Exists!</p>}
              </form>
            </Grid.Column>
            <Grid.Column>
              <AddToSellingForm
                updateItem={this.updateItem}
                initialValues={this.state.currentSelectedItem}
                handleItemAdd={this.handleItemAdd}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Button
          type="submit"
          btnStyle="primary"
          onClick={this.props.handleSubmit(this.handleSellItem)}
        >
          Sell Item
        </Button>
      </div>
    );
  }
}

const mapState = (state, props) => {
  const id = props.match.params.id;
  let selling = {};
  if (id) {
    selling = state.sellings.sellings.find(selling => selling.id === id);
  }
  return {
    initialValues: selling === undefined ? {} : selling,
    customers: state.customers.customers.map(customer => ({
      id: customer.id,
      label: customer.name,
      value: customer.name
    })),
    sellingItems: state.config.sellingItems
  };
};

const actions = { addSelling, reset };

export default connect(
  mapState,
  actions
)(
  reduxForm({
    form: "sellingForm",
    enableReinitialize: true,
    validate: validate.sellingForm
  })(Selling)
);
