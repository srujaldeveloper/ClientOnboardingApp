import React, { Component } from "react";
import NavigationNextAndPrevious from "./NavigationNextAndPrevious";

var leftmargin = {
  marginRight: "30px"
};

var emilDivStyle = {
  margin: "50px",
  textAlign: "center"
};

export default class Company extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleChange = e => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value
    });
  };

  render() {
    const { companyname } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <div className="form-group">
              <label for="teamname">
                What's the name of your company or team?
              </label>
              <input
                name="companyname"
                type="text"
                className="form-control form-control-lg"
                id="teamname"
                type="text"
                className="form-control"
                onChange={this.handleChange}
              />
            </div>
          </div>
        </div>
        <NavigationNextAndPrevious
          notPrevious
          previousClick={this.props.previosFromCompany}
          nextClick={() => this.props.handleCompanySubmit(companyname)}
        />
      </div>
    );
  }
}
