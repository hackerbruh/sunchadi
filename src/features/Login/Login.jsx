import React, { Component } from "react";

import { auth } from "../../app/config/firebaseConfig";
import Grid from "../../app/components/Grid/Grid";
import Input from "../../app/components/Input/Input";
import Button from "../../app/components/Button/Button";

class Login extends Component {
  state = {
    email: "",
    password: "",
    loginError: false,
    loginErrorMessage: "",
    logginingIn: false,
    disabled: true
  };
  handleLogin = e => {
    this.setState({
      logginingIn: true
    });
    auth
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(result => {
        result.user.updateProfile({
          displayName: "hello"
        });
        window.sessionStorage.email = result.user.email;
        window.sessionStorage.displayName = result.user.displayName;
        this.setState({
          logginingIn: false
        });
        this.props.history.push("/customers");
      })
      .catch(error => {
        let loginErrorMessage = "";
        if (error.code === "auth/wrong-password") {
          loginErrorMessage = "Wrong Password";
        } else if (error.code === "auth/user-not-found") {
          loginErrorMessage = "Wrong Email";
        } else {
          loginErrorMessage =
            "Something went wrong, check internet connection!";
        }
        this.setState({
          loginError: true,
          loginErrorMessage,
          logginingIn: false
        });
      });
  };

  handleInputChange = e => {
    if (this.state.email !== "" && this.state.password !== "") {
      this.setState({
        disabled: false
      });
    }
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    const {
      email,
      password,
      loginError,
      loginErrorMessage,
      disabled
    } = this.state;
    return (
      <div className="login" style={{ textAlign: "center", fontSize: "4rem" }}>
        <Grid gutterWidth="2rem">
          <div style={{ margin: "0 auto", width: "40rem" }}>
            <h2 style={{ marginTop: "8rem" }}>Login</h2>
            <p style={{ textAlign: "left", fontSize: "2.5rem" }}>Email: </p>
            <Input
              value={email}
              type="email"
              name="email"
              onChange={this.handleInputChange}
            />
            <p style={{ textAlign: "left", fontSize: "2.5rem" }}>Password: </p>
            <Input
              value={password}
              type="password"
              name="password"
              onChange={this.handleInputChange}
            />
            {loginError && (
              <p style={{ color: "red", fontSize: "2rem" }}>
                {loginErrorMessage}
              </p>
            )}
            <Button
              disabled={disabled}
              type="submit"
              btnStyle="primary"
              onClick={this.handleLogin}
            >
              Login
            </Button>
          </div>
        </Grid>
      </div>
    );
  }
}

export default Login;
