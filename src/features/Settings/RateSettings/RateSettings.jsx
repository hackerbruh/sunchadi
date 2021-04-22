import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";

import validate from "../../../app/config/validation";
import TextInput from "../../../app/components/Form/TextInput/TextInput";
import Button from "../../../app/components/Button/Button";
import { H1 } from "../../../app/components/Heading/Heading";

import { updateRates } from "../settingActions";

class Settings extends Component {
  handleRateChange = values => {
    this.props.handleSubmit(this.props.updateRates(values));
  };
  render() {
    return (
      <div>
        <H1 center>Setting Section</H1>
        <form>
          <Field
            name="gold_24"
            type="number"
            label="Gold Rate Per Tola (24 Caret)"
            component={TextInput}
          />
          <Field
            name="gold_22"
            type="number"
            label="Gold Rate Per Tola (22 Caret)"
            component={TextInput}
          />
          <Field
            name="silver"
            type="number"
            label="Silver Rate / 10gm"
            component={TextInput}
          />
          <Button
            type="submit"
            btnStyle="primary"
            onClick={this.props.handleSubmit(this.handleRateChange)}
          >
            Update Rates
          </Button>
        </form>
      </div>
    );
  }
}

const mapState = state => {
  return {
    initialValues: state.config.rates
  };
};

const actions = { updateRates };

export default connect(
  mapState,
  actions
)(
  reduxForm({
    form: "rateForm",
    enableReinitialize: true,
    validate: validate.rateValidation
  })(Settings)
);
