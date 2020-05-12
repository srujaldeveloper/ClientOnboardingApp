import React from "react";
import "handsontable/dist/handsontable.full.css";
import { HotTable } from "@handsontable/react";
import Handsontable from "handsontable";
import { withRouter } from "react-router-dom";
import apiCall, { METHOD, token } from "../baseUrl";
import NavigationNextAndPrevious from "./NavigationNextAndPrevious";
import Header from "./Header";
import SubHeader from "./SubHeader";
import Loading from "./Loading";
import { toast } from "react-toastify";

class Tags extends React.Component {
  constructor(props) {
    super(props);
    this.data = [
      { Name: "Innovation", Description: "", UseReporting: true },
      { Name: "Societal Impact", Description: "", UseReporting: true },
      { Name: "Reputation", Description: "", UseReporting: false }
    ];
    this.state = {};
  }

  handleSave = () => {
    let promises = [];
    if (!this.data.filter(d => d.Name).length) {
      toast.warn("Enter some data")
      this.setState({
        loading: false
      });
      return;
    }
    promises = this.data.map((element, index) => {
      if ( element.Name)
        return new Promise((resolver, reject) =>
          apiCall(
            "/Tags/",
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
    });
    Promise.all(promises)
      .then(() => {
        this.setState({
          loading: false
        });
        this.props.history.push("/goals");
      })
      .catch(err => {
        this.setState({
          loading: false
        });
        toast.error("Something went wrong");
      });
  };

  handleNext = () => {
    this.setState({
      loading: true
    });
    this.handleSave();
  };
  handlePrevious = () => {
    this.props.history.push("/perspectives");
  };
  handleChange = (e, row, col) => {
    this.data[row]["UseReporting"] = e.target.checked;
  };

  inputRenderer = (instance, td, row, col, prop, value, cellProperties) => {
    var escaped = Handsontable.helper.stringify(value),
      input;

    input = document.createElement("INPUT");
    input.type = "checkbox";
    input.checked = value;
    input.onchange = e => this.handleChange(e, row, col);

    Handsontable.dom.addEvent(input, "mousedown", function(e) {
      e.preventDefault(); // prevent selection quirk
    });

    Handsontable.dom.empty(td);
    td.appendChild(input);
    return td;
  };

  render() {
    const { loading } = this.state;
    return (
      <>
        <Header />
        <div className="container">
          <SubHeader
            title="Create some strategic themes to identify and group goals, KPIs, risks and initiatives"
            description="Strategic Themes or Tags are used to group elements together that doesn't belong to
            the same perspective, but within other subjects. Like innovation and sustainability."
          />
          <HotTable
            licenseKey="non-commercial-and-evaluation"
            data={this.data}
            {...{
              dataSchema: {
                Name: null,
                Description: null,
                UseReporting: false
              },

              startRows: 5,
              startCols: 4,
              stretchH: "all",
              colHeaders: ["Name", "Description", "Display in strategymap"],
              columns: [
                { data: "Name", width: "150" },
                { data: "Description", width: "250" },
                { renderer: this.inputRenderer }
              ],
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

export default withRouter(Tags);
