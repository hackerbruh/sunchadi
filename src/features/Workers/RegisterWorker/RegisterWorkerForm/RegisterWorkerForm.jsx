import React from "react";

import { Field } from "redux-form";

import Div from "../../../../app/common/Div/Div";
import Button from "../../../../app/components/Button/Button";
import Grid from "../../../../app/components/Grid/Grid";
import TextInput from "../../../../app/components/Form/TextInput/TextInput";
import FileInput from "../../../../app/components/Form/FileInput/FileInput";

export default ({ handleSubmit, handleImageChange, handleWorkerAdd }) => (
  <Div>
    <Grid gutterWidth="4rem">
      <Grid.Row columns={2}>
        <Grid.Column>
          <form>
            <Field
              name="name"
              type="text"
              label="Worker Name"
              component={TextInput}
            />
            <Field
              name="address"
              type="text"
              label="Worker Address"
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
          </form>
        </Grid.Column>
        <Grid.Column>
          <FileInput label="Worker Image" onChange={handleImageChange} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
    <Button
      type="submit"
      btnStyle="primary"
      onClick={handleSubmit(handleWorkerAdd)}
    >
      Add Worker
    </Button>
  </Div>
);
