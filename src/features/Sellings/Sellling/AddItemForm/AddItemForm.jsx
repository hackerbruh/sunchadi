import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm, reset } from "redux-form";

import cuid from "cuid";

import TextInput from "../../../../app/components/Form/TextInput/TextInput";
import DropDown from "../../../../app/components/Form/DropDown/DropDown";
import Button from "../../../../app/components/Button/Button";

import validate from "../../../../app/config/validation";

class AddToSellingForm extends Component {
  handleCodeChange = (e, value) => {
    let item = this.props.sellingItems.find(i => i.code === +value);
    if (item === undefined) {
      item = {
        finalWt: "",
        loss: "",
        name: "",
        wages: ""
      };
    }
    const { finalWt, loss, name, wages } = item;
    this.props.change("finalWt", finalWt);
    this.props.change("loss", loss);
    this.props.change("name", name);
    this.props.change("wages", wages);
  };
  handleItemAdd = item => {
    let rate = this.props.applyRates[item.type]
    item.price = rate * (item.finalWt / 10 + item.loss / 10) + +item.wages;
    if (this.props.initialValues.id) {
      return this.props.updateItem(item);
    }
    item.id = cuid();

    this.props.handleItemAdd(item);
    this.props.dispatch(reset("addToSellingItem"));
  };
  render() {
    return (
      <div>
        <form>
          <Field
            name="code"
            type="number"
            label="Item Code"
            onChange={this.handleCodeChange}
            component={TextInput}
          />
          <Field
            name="finalWt"
            type="number"
            label="Item Weight"
            component={TextInput}
          />
          <Field
            name="type"
            type="text"
            label="Item Type"
            options={this.props.rates}
            component={DropDown}
          />
          <Field
            name="loss"
            type="number"
            label="Item Loss"
            component={TextInput}
          />
          <Field
            name="wages"
            type="number"
            label="Item Wage"
            component={TextInput}
          />

          <Field
            name="name"
            type="text"
            label="Item Name"
            component={TextInput}
          />
          <Button
            type="submit"
            btnStyle="primary"
            onClick={this.props.handleSubmit(this.handleItemAdd)}
          >
            {this.props.initialValues.id ? "Update Item" : "Add Item"}
          </Button>
        </form>
      </div>
    );
  }
}

const mapState = state => {
  return {
    applyRates: state.config.rates,
    rates: Object.keys(state.config.rates).map(type => ({ label: type, value: type, rate: state.config.rates[type] })),
    sellingItems: state.config.sellingItems
  };
};

const actions = {
  reset
};

export default connect(
  mapState,
  actions
)(
  reduxForm({
    form: "addToSellingItem",
    enableReinitialize: true,
    validate: validate.addToSellingItem
  })(AddToSellingForm)
);
