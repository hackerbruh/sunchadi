import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";

import validation from "../../../app/config/validation";
import { addWorker } from "../workerActions";

import Div from "../../../app/common/Div/Div";
import Loader from "../../../app/common/Loader/Loader";

import RegisterWorkerForm from "./RegisterWorkerForm/RegisterWorkerForm";

class RegisterWorker extends Component {
  state = {
    image: null
  };
  handleImageChange = image => {
    this.setState({ image });
  };
  handleWorkerAdd = values => {
    const { image } = this.state;
    values.age = +values.age;
    values.phone = +values.phone;
    values.total = 0;
    values.paid = 0;
    this.props.addWorker(image, values, this.props.history);
  };
  render() {
    const { handleSubmit, loading, error } = this.props;
    if (error) {
      return <div>Inernet Connection Error</div>;
    }
    if (loading) {
      return <Loader message="Registering Worker" />;
    }

    return (
      <Div>
        <RegisterWorkerForm
          {...{ handleSubmit }}
          handleImageChange={this.handleImageChange}
          handleWorkerAdd={this.handleWorkerAdd}
        />
      </Div>
    );
  }
}

const mapState = ({ async: { loading, error } }) => ({ loading, error });

const actions = {
  addWorker
};

export default connect(
  mapState,
  actions
)(
  reduxForm({
    form: "registerWorker",
    enableReinitialize: true,
    validate: validation.registerWorkerValidation
  })(RegisterWorker)
);
