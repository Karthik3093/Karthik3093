import React from "react";
import Joi from "joi-browser";
import Form from "./pages/Form";
import LeftImage from "./pages/LeftImage";
import { login } from "../services/AuthService";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().email().label("Username"),
    password: Joi.string().required().min(5).label("Password"),
  };

  /**@doSubmit
   * @This method is used to know whether the form is submitted
   */
  doSubmit = async () => {
    try {
      const { data } = this.state;
      const { data: jwt } = await login(data.username, data.password);
      localStorage.setItem("token", jwt);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
    // window.location.href = "/";
    // console.log("Submitted");
  };

  render() {
    return (
      <div className="container">
        <div className="row col-md-12 ml-2">
          <div className="col-md-6">
            <LeftImage />
          </div>
          <div className="col-md-6 secondpart">
            <h1 className="welcome text-center pb-5">Welcome to FansPlan</h1>
            <form onSubmit={this.handleSubmit}>
              {this.renderInput("username", "Username")}
              {this.renderInput("password", "Password", "password")}
              {this.renderButton("Login")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
