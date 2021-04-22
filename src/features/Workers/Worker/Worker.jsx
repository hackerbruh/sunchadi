import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

import "./Worker.css";

import { deleteWorker, updateWorker } from "../workerActions";
import validate from "../../../app/config/validation";

import Loader from "../../../app/common/Loader/Loader";
import Grid from "../../../app/components/Grid/Grid";
import Button from "../../../app/components/Button/Button";
import TextInput from "../../../app/components/Form/TextInput/TextInput";
import { H1 } from "../../../app/components/Heading/Heading";
import Div from "../../../app/common/Div/Div";

import WorkerHistory from "./WorkerHistory/WorkerHistory";
import PayForm from "./PayForm/PayForm";

class Worker extends Component {
  state = {
    payError: false,
    history: []
  };
  handlePayChange = value => {
    this.setState({
      payError: false
    });
    if (this.props.initialValues.total < value) {
      return this.setState({ payError: true });
    }
    this.props.change("total", this.props.initialValues.total - value);
  };
  handleWorkerUpdate = values => {
    if (values.paid !== "") {
      values.total = values.total - values.paid;
    }
    values.paid = 0;
    console.log(values);
    this.props.updateWorker(
      {
        ...values,
        id: this.props.initialValues.id,
        history: this.props.initialValues.history
      },
      this.props.history
    );
  };
  render() {
    const { initialValues, deleteWorker, handleSubmit, loading } = this.props;
    if (loading) {
      return <Loader message="Processing Action..." />;
    }
    if (initialValues === null) {
      return <Loader message="Loading Worker..." />;
    }
    const { id, photoURI } = initialValues;
    return (
      <Div>
        <form>
          <Grid gutterWidth="5rem">
            <Grid.Row columns={3}>
              <Grid.Column>
                <img
                  src={photoURI || "/customer.jpeg"}
                  alt="worker"
                  style={{ width: "100%", borderRadius: "4px" }}
                />
                <Button
                  type="button"
                  btnStyle="danger"
                  onClick={() => deleteWorker(id, this.props.history)}
                >
                  Delete Worker
                </Button>
              </Grid.Column>
              <Grid.Column>
                <Field
                  name="name"
                  type="text"
                  label="Worker Name"
                  component={TextInput}
                />
                <Field
                  name="address"
                  type="text"
                  label="Worker Adderss"
                  component={TextInput}
                />
                <Field
                  name="phone"
                  type="number"
                  label="Worker Phone"
                  component={TextInput}
                />
                <Field
                  name="age"
                  type="number"
                  label="Worker Age"
                  component={TextInput}
                />

                <Button
                  type="submit"
                  btnStyle="primary"
                  onClick={handleSubmit(this.handleWorkerUpdate)}
                >
                  Update Worker
                </Button>
              </Grid.Column>
              <Grid.Column>
                <PayForm
                  history={this.props.initialValues.history}
                  handlePayChange={this.handlePayChange}
                  handleSubmit={this.props.handleSubmit}
                  payError={this.state.payError}
                  initialValues={{total: this.props.initialValues.total}}
                  handleWorkerUpdate={this.handleWorkerUpdate}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <H1>Work Records</H1>
          <WorkerHistory history={this.props.initialValues.history} />
        </form>
      </Div>
    );
  }
}

const mapState = (state, props) => {
  const workers = state.workers.workers;
  const orders = state.orders.orders;
  const loading = state.async.loading;
  const id = props.match.params.id;
  let worker = null;
  if (workers.length > 0) {
    worker = workers.find(c => c.id === id);
  }
  return {
    orders,
    initialValues: worker === undefined ? {} : worker,
    loading
  };
};

const actions = {
  deleteWorker,
  updateWorker
};

export default connect(
  mapState,
  actions
)(
  reduxForm({
    form: "updateCustomer",
    enableReinitialize: true,
    validate: validate.registerCustomerValidation
  })(Worker)
);
