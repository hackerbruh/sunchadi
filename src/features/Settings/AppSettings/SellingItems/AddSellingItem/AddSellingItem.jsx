import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

import validate from "../../../../../app/config/validation";
import { addSellingItem, updateSellingItem } from "../../../settingActions";

import Loader from "../../../../../app/common/Loader/Loader";
import Grid from "../../../../../app/components/Grid/Grid";
import TextInput from "../../../../../app/components/Form/TextInput/TextInput";
import Button from "../../../../../app/components/Button/Button";
import { H1 } from "../../../../../app/components/Heading/Heading";

class AddSellingItem extends Component {
  handleItemAdd = values => {
    values.price = +values.price;
    values.code = +values.code
    if (this.props.initialValues.id) {
      return this.props.updateSellingItem(
        {
          ...values,
          id: this.props.match.params.id
        },
        this.props.history
      );
    }
    this.props.addSellingItem(values, this.props.history);
  };
  render() {
    const { handleSubmit, loading } = this.props;
    if (loading) {
      return <Loader message="Processing Actions" />;
    }
    return (
      <div>
        <H1 center>
          {this.props.match.params.id ? "Update Item" : "Add Item"}
        </H1>
        <Grid gutterWidth="3rem">
          <Grid.Row columns={2}>
            <Grid.Column>
              <form>
                <Field
                  name="code"
                  type="text"
                  label="Item Code"
                  component={TextInput}
                />
                <Field
                  name="name"
                  type="text"
                  label="Item Name"
                  component={TextInput}
                />
                <Field
                  name="category"
                  type="text"
                  label="Item Category"
                  component={TextInput}
                />
                <Field
                  name="price"
                  type="number"
                  label="Item Price [Rs./10gm(1 tola)]"
                  component={TextInput}
                />
                <Button
                  type="submit"
                  btnStyle="primary"
                  onClick={handleSubmit(this.handleItemAdd)}
                >
                  {this.props.match.params.id ? "Update Item" : "Add Item"}
                </Button>
              </form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapState = (state, props) => {
  let item = {};
  const id = props.match.params.id;
  if (id) {
    item = state.config.sellingItems.find(i => i.id === id);
  }
  return {
    loading: state.async.loading,
    initialValues: item === undefined ? {} : item,
    items: state.config.sellingItems.map(i => ({
      name: i.name
    }))
  };
};

const actions = {
  updateSellingItem,
  addSellingItem
};

export default connect(
  mapState,
  actions
)(
  reduxForm({
    form: "itemForm",
    enableReinitialize: true,
    validate: validate.addOrderItemValidation
  })(AddSellingItem)
);
