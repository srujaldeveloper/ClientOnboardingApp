import React from "react";
import { withRouter } from "react-router";
import Email from "./components/Email";
import Company from "./components/Company";
import OTP from "./components/OTP";
import apiCall, { METHOD, token } from "./baseUrl";
import Header from "./components/Header";
import Loading from "./components/Loading";

class Wizard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showcompanyemail: true,
      showcompanyname: false,
      shwoconfirm: false
    };
  }

  SubmitName = companyname => {
    let result;
    this.setState({
      loading: false,
      showcompanyemail: false,
      showcompanyname: false,
      companyname
    });
    return result;
  };

  SubmitEmail = companyemail => {
    let result;
    this.setState(
      {
        loading: true
      },
      () => {
        apiCall(
          "System/AddClientUser",
          {
            Username: companyemail
          },
          res => {
            this.setState({
              loading: false,
              showcompanyemail: false,
              showcompanyname: true,
              companyemail
            });
          },
          err => this.setState({
            loading: false,
          }),
          METHOD.POST
        );
      }
    );
    return result;
  };
  previosFromCompany = () => {
    this.setState({
      showcompanyemail: true,
      showcompanyname: false
    });
  };
  render() {
    const {
      companyemail,
      showcompanyemail,
      showcompanyname,
      loading,
      companyname
    } = this.state;
    return (
      <>
        <Header />
        {showcompanyemail ? (
          <Email
            companyemail={companyemail}
            handleEmailSubmit={this.SubmitEmail}
          />
        ) : showcompanyname ? (
          <Company
            previosFromCompany={this.previosFromCompany}
            handleCompanySubmit={this.SubmitName}
          />
        ) : (
          <OTP companyemail={companyemail} companyname={companyname} />
        )}
        <Loading isLoading={loading} />
      </>
    );
  }
}

export default withRouter(Wizard);
