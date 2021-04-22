import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import TextInput from "../../../../app/components/Form/TextInput/TextInput";
import Button from "../../../../app/components/Button/Button";

class PayForm extends Component {
  handlePayChange = (e, value) => {
    this.props.handlePayChange(value);
  };
  render() {
    return (
      <React.Fragment>
        <Field
          name="total"
          disabled={true}
          type="number"
          label="Total Wages"
          component={TextInput}
        />
        <Field
          name="paid"
          type="number"
          label="Paying Amount"
          onChange={this.handlePayChange}
          component={TextInput}
        />
        {this.props.payError && <p className="error">Not Enough Balance</p>}
        <Button
          type="submit"
          btnStyle="primary"
          onClick={this.props.handleSubmit(this.props.handleWorkerUpdate)}
        >
          Pay
        </Button>
      </React.Fragment>
    );
  }
}

export default reduxForm({
  form: "payForm",
  enableReinitialize: true
})(PayForm);
