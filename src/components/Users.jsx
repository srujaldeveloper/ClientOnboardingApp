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

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.data = [
      { Name: "John", EmailAddress: "john@email.com" },
      { Name: "Per", EmailAddress: "per@email.com" }
    ];
    this.state = {};
  }

  handleSave = () => {
    let isError = false;
    let promises = [];
    console.log("global Token in Users.jsx on save:" + JSON.stringify(token()));
    if (!this.data.filter(d => d.EmailAddress && d.Name).length) {
      toast.warn("Enter some data");
      this.setState({
        loading: false
      });
      return;
    }
    promises = this.data.map((element, index) => {
      if (element.EmailAddress && element.Name && isError == false) {
        return new Promise((resolver, reject) =>
          apiCall(
            "/Users/",
            {
              ...element,
              Division: {
                Id: 1
              },
              CanLogIn: true,
              Groups: [
                {
                  Id: 11
                }
              ]
            },
            res => {
              resolver(true);
            },
            //it will not handle becuase of the last parameter, which is passed as false
            err => {
             isError = true;
             reject(err);
            },
            METHOD.POST,
            token(), {}, false
          )
        );
      }
    });
    Promise.all(promises)
      .then(() => {
        this.setState({
          loading: false
        });
        this.props.history.push("/perspectives");
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

  render() {
    const { loading } = this.state;


    return (
      <>
        <Header />
        <div className="container">
          <SubHeader
            title="Create some users that will be responsible for various strategic elements like programms and objectives"
            description="Add some users to be responsible for goals, initiatives, kpi's, milestones or risk elements will be 
            notified when they are assigned to an item. If notifications are enabled, they will
            also get reminders to update the status each period. Eg monthly."
          />
          <HotTable
            licenseKey="non-commercial-and-evaluation"
            data={this.data}
            {...{
              dataSchema: {
                Name: null,
                EmailAddress: null
              },
              startRows: 5,
              stretchH: "all",
              startCols: 4,
              colHeaders: ["Name", "Email"],
              columns: [{ data: "Name" }, { data: "EmailAddress" }],
              minSpareRows: 1
            }}
          />
          <NavigationNextAndPrevious notPrevious nextClick={this.handleNext} />
          <Loading isLoading={loading} />
        </div>
      </>
    );
  }
}

export default withRouter(Users);
