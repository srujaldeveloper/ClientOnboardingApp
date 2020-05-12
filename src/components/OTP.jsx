import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import apiCall, { METHOD, token } from "../baseUrl";

import NavigationNextAndPrevious from "./NavigationNextAndPrevious";
import { withCookies } from "react-cookie";

var emilDivStyle = {
  margin: "50px",
  textAlign: "center"
};

class OTP extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {

    console.log("THIS IS FROM OTP :", this.props);
  }

  handleChange = e => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value
    });
  };

  submitPasscode = () => {
    let email = this.props.companyemail;
    let companyname = this.props.companyname;

    let data = {
      username: email,
      Password: companyname,
      Temporaltoken: this.state.passcode //"a9os8d"
    };
    let result;
    apiCall(
      "/System/VerifyUser",
      data,
      res => {
        console.log(res);
        localStorage.setItem("Auth_domain", res.Auth_domain);
        localStorage.setItem("Token", res.Token);
        //set the cookies
        const { cookies } = this.props;

        
        cookies.set('Auth_domain', res.Auth_domain, { path: '/' });
        cookies.set('Token', res.Token, { path: '/' });

        console.log("Domain: "+ res.Auth_domain);
        console.log("Token: " + res.Token);
        console.log("global Token variable after setting localStorage values:" + JSON.stringify(token));
        this.setState({
          loading: false
        });
        this.props.history.push("/users");
      },
      err => {
        this.setState({
          loading: false
        });
        console.log(err);
      },
      METHOD.POST
    );
  };

  VerifyEmailFormHandler = event => {
    this.setState({
      loading: true
    });
    event.preventDefault();
    this.submitPasscode();
  };
  render() {
    return (
      <form onSubmit={this.VerifyEmailFormHandler} style={emilDivStyle}>
        <div className="form-group">
          <label>
            Please type in the passcode from the email we just sent you.
          </label>
          <input
            value={this.state.passcode}
            maxLength="12"
            type="text"
            name="passcode"
            className="form-control"
            onChange={this.handleChange}
          />
        </div>
        <button
          onClick={this.VerifyEmailFormHandler}
          className="btn btn-lg btn-primary"
        >
          Next
        </button>
      </form>
    );
  }
}

export default withRouter(withCookies(OTP));
