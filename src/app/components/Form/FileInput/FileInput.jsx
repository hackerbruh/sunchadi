import React, { Component } from "react";
import cuid from "cuid";

const id = cuid();

class FileInput extends Component {
  state = {
    image: null
  };
  handleFileInput = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = e => {
      this.setState({ image: e.target.result });
    };
    reader.readAsDataURL(e.target.files[0]);
    this.props.onChange(file);
  };
  render() {
    const { image } = this.state;
    const { label } = this.props
    return (
      <div className="fileinput">
        <label className="label" htmlFor={id}>
          {label} <br /><br />
          <img src={image || "/customer.jpeg"} alt="Customer" style={{ cursor: 'pointer', width: '20rem', height: '20rem' }} />
        </label>
        <input
          type="file"
          accept="image/*"
          id={id}
          onChange={this.handleFileInput}
          style={{ display: "none" }}
        />
      </div>
    );
  }
}

export default FileInput;
