import React, { Component } from "react";
import cuid from "cuid";

import "./Dropdown.css";

class DropDown extends Component {
  state = {
    showOptions: false,
    options: []
  };
  componentWillMount() {
    this.setState({
      options: this.props.options
    });
  }
  handleInputChange = e => {
    this.props.input.onChange(e.target.value);
    this.setState({
      showOptions: true,
      options: this.props.options.filter(option =>
        option.label.toLowerCase().includes(e.target.value.toLowerCase())
      )
    });
  };
  handleOptionClick = (value, id) => {
    this.setState({
      showOptions: false
    });
    if (this.props.getSelectedValue) {
      this.props.getSelectedValue(value);
    }
    if (this.props.getSelectedId) {
      this.props.getSelectedId(id)
    }
    this.props.input.onChange(value);
  };
  render() {
    const id = cuid();
    const { showOptions, options } = this.state;
    const {
      label,
      style,
      type,
      input,
      meta: { touched, error }
    } = this.props;
    return (
      <div>
        <label className="label" htmlFor={id}>
          {label}
        </label>
        <input
          {...input}
          type={type}
          autoComplete="off"
          id={id}
          className="input"
          onChange={this.handleInputChange}
          value={input.value}
          style={style}
        />
        {input.value !== "" && showOptions && (
          <div className="select__options">
            {options &&
              options.map(option => (
                <div
                  key={option.id}
                  className="select__options--item"
                  onClick={() => this.handleOptionClick(option.value, option.id)}
                >
                  {option.label}
                </div>
              ))}
          </div>
        )}
        {touched && error && <p className="error">{error}</p>}
      </div>
    );
  }
}

export default DropDown;
