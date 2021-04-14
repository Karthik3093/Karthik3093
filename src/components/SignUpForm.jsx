import React from "react";
import Joi from "joi-browser";
import { Link } from "react-router-dom";
import Form from "./pages/Form";
import LeftImage from "./pages/LeftImage";
import { register } from "../services/UserService";

class SignUpForm extends Form {
  state = {
    data: { username: "", email: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().min(5).label("Password"),
  };

  /**@doSubmit
   * @This method is used to take the new signedup user to the home page
   */
  doSubmit = async () => {
    try {
      const response = await register(this.state.data);
      localStorage.setItem("token", response.headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div className="container">
        <div className="row col-md-12 ml-1">
          <div className="col-md-6">
            <LeftImage />
          </div>
          <div className="col-md-6 secondpart">
            <h1 className="welcome text-center">Welcome to FansPlan</h1>
            <Link to="/login">
              <p className="text-center">Log in to acess your account</p>
            </Link>
            <form onSubmit={this.handleSubmit}>
              {this.renderInput("username", "Username")}
              {this.renderInput("email", "Email")}
              {this.renderInput("password", "Password", "password")}
              {this.renderButton("Signup")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUpForm;
