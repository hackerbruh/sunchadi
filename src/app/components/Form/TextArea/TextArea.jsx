import React from "react";

import cuid from "cuid";

const id = cuid();

export default ({ input, label, meta: { touched, error } }) => (
  <div>
    <label className="label" htmlFor={id}>
      {label}
    </label>
    <textarea {...input} style={{ resize: 'none' }} className="input" name="" id={id} cols="30" rows="5" />
    {touched && error && <p className="error">{error}</p>}
  </div>
);
