import React, { Component } from "react";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import NavigationNextAndPrevious from "./NavigationNextAndPrevious";
var emilDivStyle = {
  margin: "50px",
  textAlign: "center"
};

export default class Email extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {
    const { companyemail } = this.props;
    this.setState({
      companyemail
    });
  }

  handleChange = e => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <Formik
        enableReinitialize
        initialValues={{ email: this.state.companyemail }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Required")
        })}
        onSubmit={values => {
          this.props.handleEmailSubmit(values.email);
        }}
        render={({ values, handleSubmit }) => (
          <div className="registerfrom">
            <div className="container">
              <div className="row">
                <div className="col-12 mb-4 text-center">
                  <div className="form-group">
                    <label for="email">First, enter your emailaddress, and we will send you an email with a passcode for you to use to continue registration</label>

                    <Field
                      className="form-control form-control-lg"
                      name="email"
                      type="email"
                    />
                    <ErrorMessage name="email" />
                  </div>
                  <button
                    onClick={handleSubmit}
                    className="btn btn-lg btn-primary"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      />
    );
  }
}
