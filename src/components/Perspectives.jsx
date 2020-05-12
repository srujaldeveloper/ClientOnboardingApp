import React from "react";
import "handsontable/dist/handsontable.full.css";
import { HotTable } from "@handsontable/react";
import { withRouter } from "react-router-dom";
import apiCall, { METHOD, token } from "../baseUrl";
import NavigationNextAndPrevious from "./NavigationNextAndPrevious";
import Header from "./Header";
import SubHeader from "./SubHeader";
import Loading from "./Loading";
import { toast } from "react-toastify";

class Perspectives extends React.Component {
  constructor(props) {
    super(props);
    this.data = [
      { Name: "Customer perspective", Description: "" },
      { Name: "Internal perspective", Description: "" },
      { Name: "Financial perspective", Description: "" },
      { Name: "Learning and growth", Description: "" }
    ];
    this.state = {};
  }

  handleSave = () => {
    let isError = false;
    let promises = [];
    if (!this.data.filter(d =>  d.Name).length) {
      toast.warn("Enter some data")
      this.setState({
        loading: false
      });
      return;
    }
    promises = this.data.map((element, index) => {
      if (element.Name && isError == false) {
        return new Promise((resolver, reject) =>
          apiCall(
            "/Perspectives",
            {
              ...element
            },
            res => {
              resolver(res);
            },
            err => {
              reject(err);
            },
            METHOD.POST,
            token()
          )
        );
      }
    });
    Promise.all(promises)
      .then(() => {
        this.setState({
          loading: false
        });
        this.props.history.push("/tags");
      })
      .catch(err => {
        this.setState({
          loading: false
        });
        toast.error("Something went wrong");
      });
    this.setState({
      loading: false
    });
  };

  handleNext = () => {
    this.setState({
      loading: true
    });
    this.handleSave();
  };
  handlePrevious = () => {
    this.props.history.push("/users");
  };
  render() {
    const { loading } = this.state;
    return (
      <>
        <Header />
        <div className="container">
          <SubHeader
            title="Create some Perspectives to group your goals and objectives"
            description="The Balanced Scorecard is a set of performance targets and results relating to four 
            dimensions of performance: Financial, customer, internal process and innovation.
            It recognises that organisa­tions are responsible to different stakeholder groups, 
            such as employees, suppliers, customers, com­munity and shareholders."
          />
          <HotTable
            licenseKey="non-commercial-and-evaluation"
            data={this.data}
            {...{
              dataSchema: {
                Name: null,
                Description: null
              },
              startRows: 5,
              startCols: 4,
              stretchH: "all",
              colHeaders: ["Name", "Description"],
              columns: [{ data: "Name" }, { data: "Description" }],
              minSpareRows: 1
            }}
          />
          <NavigationNextAndPrevious
            notPrevious
            previousClick={this.handlePrevious}
            nextClick={this.handleNext}
          />
          <Loading isLoading={loading} />
        </div>
      </>
    );
  }
}

export default withRouter(Perspectives);
