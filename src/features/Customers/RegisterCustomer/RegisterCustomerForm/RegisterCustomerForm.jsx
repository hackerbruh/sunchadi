import React from "react";

import { Field } from "redux-form";

import Div from "../../../../app/common/Div/Div";
import Button from "../../../../app/components/Button/Button";
import Grid from "../../../../app/components/Grid/Grid";
import TextInput from "../../../../app/components/Form/TextInput/TextInput";
import FileInput from "../../../../app/components/Form/FileInput/FileInput";

export default ({ handleSubmit, handleImageChange, handleCustomerAdd }) => (
  <Div>
    <Grid gutterWidth="4rem">
      <Grid.Row columns={2}>
        <Grid.Column>
          <form>
            <Field
              name="name"
              type="text"
              label="Customer Name"
              component={TextInput}
            />
            <Field
              name="address"
              type="text"
              label="Customer Address"
              component={TextInput}
            />
            <Field
              name="phone"
              type="number"
              label="Customer Phone"
              component={TextInput}
            />
          </form>
        </Grid.Column>
        <Grid.Column>
          <FileInput label="Customer Image" onChange={handleImageChange} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
    <Button
      type="submit"
      btnStyle="primary"
      onClick={handleSubmit(handleCustomerAdd)}
    >
      Add Customer
    </Button>
  </Div>
);
