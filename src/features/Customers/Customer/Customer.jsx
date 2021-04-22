import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

import './Customer.css'

import { deleteCustomer, updateCustomer } from "../customerActions";
import validate from "../../../app/config/validation";

import Loader from "../../../app/common/Loader/Loader";
import Grid from "../../../app/components/Grid/Grid";
import Button from "../../../app/components/Button/Button";
import TextInput from "../../../app/components/Form/TextInput/TextInput";
import { H1, H2, H3 } from '../../../app/components/Heading/Heading';
import Collapse from '../../../app/components/Collapse/Collapse'
import Div from "../../../app/common/Div/Div";

class Customer extends Component {
  handleCustomerUpdate = values => {
    this.props.updateCustomer({
      ...values,
      id: this.props.initialValues.id,
      history: this.props.initialValues.history
    }, this.props.history);
  };
  render() {
    const { initialValues, deleteCustomer, handleSubmit, loading } = this.props;
    if (loading) {
      return <Loader message="Processing Action..." />;
    }
    if (initialValues === null) {
      return <Loader message="Loading Customer..." />;
    }
    const { id, photoURI } = initialValues;
    return <Div>
        <Grid gutterWidth="5rem">
          <Grid.Row columns={2}>
            <Grid.Column>
              <img src={photoURI || '/customer.jpeg'} alt="Customer" style={{ width: "100%", borderRadius: "4px" }} />
            <Button type="button" btnStyle="danger" onClick={() => deleteCustomer(id, this.props.history)}>
              Delete Customer
              </Button>
            </Grid.Column>
            <Grid.Column>
              <form>
                <Field name="name" type="text" label="Customer Name" component={TextInput} />
                <Field name="address" type="text" label="Customer Adderss" component={TextInput} />
                <Field name="phone" type="number" label="Customer Phone" component={TextInput} />
              </form>
              <Button type="submit" btnStyle="primary" onClick={handleSubmit(this.handleCustomerUpdate)}>
                Update Customer
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <H1>Purchase Records</H1>
        {this.props.initialValues.history && this.props.initialValues.history.map(
            h => (
              <Collapse>
                <Collapse.Trigger>
                  <div className="list_trigger">
                  Bill Number <span className="mark">{h.billNo}</span>
                    Purchase Date <span className="mark">{h.purchaseDate}</span> <span style={{ fontSize: '1.5rem' }}>&#43;</span>
                  </div>
                </Collapse.Trigger>
                <Collapse.Content>
                  <ul className="list">
                    {h.items.map((item, index) => (
                      <li key={item.name} className="list__item">
                        <table cellPadding="2" cellSpacing="10">
                          <thead>
                            <tr>
                              <th>
                                <H2>S.N</H2>
                              </th>
                              <th>
                                <H2>Item Name</H2>
                              </th>
                              <th>
                                <H2>Item Price</H2>
                              </th>
                              <th>
                                <H2>Quantity</H2>
                              </th>
                              <th>
                                <H2>Total Price</H2>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <H3>{index + 1}</H3>
                              </td>
                              <td>
                                <H3>{item.name}</H3>
                              </td>
                              <td>
                                <H3>Rs .{item.price}</H3>
                              </td>
                              <td>
                                <H3>{item.quantity}</H3>
                              </td>
                              <td>
                                <H3>Rs. {item.price * item.quantity}</H3>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </li>
                    ))}
                  </ul>
                </Collapse.Content>
              </Collapse>
            )
          )}
      </Div>;
  }
}

const mapState = (state, props) => {
  const customers = state.customers.customers;
  const loading = state.async.loading;
  const id = props.match.params.id;
  console.log(id)
  let customer = null;
  if (customers.length > 0) {
    customer = customers.find(c => (c.id === id));
  }
  console.log(customer)
  return {
    initialValues: customer === undefined ? {} : customer,
    loading
  };
};

const actions = {
  deleteCustomer,
  updateCustomer
};

export default connect(
  mapState,
  actions
)(
  reduxForm({
    form: "updateCustomer",
    enableReinitialize: true,
    validate: validate.registerCustomerValidation
  })(Customer)
);
