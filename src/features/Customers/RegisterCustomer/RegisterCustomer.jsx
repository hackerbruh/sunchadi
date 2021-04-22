import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";

import validation from "../../../app/config/validation";
import { addCustomer } from "../customerActions";

import Div from "../../../app/common/Div/Div";
import Loader from "../../../app/common/Loader/Loader";

import RegisterCustomerForm from './RegisterCustomerForm/RegisterCustomerForm';

class RegisterCustomer extends Component {
  state = {
    image: null
  };
  handleImageChange = image => {
    this.setState({ image });
  };
  handleCustomerAdd = values => {
    const { image } = this.state;    
    this.props.addCustomer(image, values, this.props.history);
  };
  render() {
    const { handleSubmit, loading, error } = this.props;
    if (error) {
      return <div>Inernet Connection Error</div>;
    }
    if (loading) {
      return (
        <Loader message="Registering Customer" />
      );
    }

    return <Div>
        <RegisterCustomerForm {...{ handleSubmit }} handleImageChange={this.handleImageChange} handleCustomerAdd={this.handleCustomerAdd} />
      </Div>;
  }
}

const mapState = ({ async: { loading, error } }) => ({ loading, error });

const actions = {
  addCustomer
};

export default connect(
  mapState,
  actions
)(
  reduxForm({
    form: "registerCustomer",
    enableReinitialize: true,
    validate: validation.registerCustomerValidation
  })(RegisterCustomer)
);
