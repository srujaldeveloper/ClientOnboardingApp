import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { HotTable } from "@handsontable/react";
import apiCall, { METHOD, token } from "../baseUrl";
import "handsontable/dist/handsontable.full.css";
import NavigationNextAndPrevious from "./NavigationNextAndPrevious";
import Header from "./Header";
import SubHeader from "./SubHeader";
import Loading from "./Loading";
import { toast } from "react-toastify";

class Initiatives extends Component {
  constructor(props) {
    super(props);
    this.data = [
      {
        Name: "Establish local sales offices in all European countries",
        Description: ""
      },
      {
        Name: "Implement chatbot to handle first-line support",
        Description: ""
      },
      { Name: "Lower wait time on helpdesk", Description: "" }
    ];
    this.state = {
      Perspectives: [],
      Goals: []
    };
  }

  componentDidMount() {
    this.getTags();
    this.getUsers();
    this.getGoals();
  }

  getGoals = () => {
    apiCall(
      "/Goals?isactive=true",
      {},
      res => {
        this.setState({
          GoalSource: res.map(d => d.Name + " - " + d.Id)
        });
      },
      err => {
        console.log(err);
      },
      METHOD.GET,
      token()
    );
  };

  getTags = () => {
    apiCall(
      "/Tags?isactive=true",
      {},
      res => {
        this.setState({
          TagSource: res.map(d => d.Name + " - " + d.Id)
        });
      },
      err => {
        console.log(err);
      },
      METHOD.GET,
      token()
    );
  };

  getUsers = () => {
    apiCall(
      "/Users?isactive=true",
      {},
      res => {
        this.setState({
          UserSource: res.map(d => d.Name + " - " + d.Id)
        });
      },
      err => {
        console.log(err);
      },
      METHOD.GET,
      token()
    );
  };

  handleNext = e => {
    this.setState({
      loading: true
    });
    let promises = [];
    if (!this.data.filter(d => d.Name).length) {
      toast.warn("Enter some data")
      this.setState({
        loading: false
      });
      return;
    }
    promises = this.data.map((item, index) => {
      const { Name, Description, Goal, Responsibles, TagRelations } = item;

      if (Name ) {
        let payload = {
          ...item,
          Goal: { Id: Goal.split(" - ")[1] },
          Responsibles: [{ Id: Responsibles.split(" - ")[1] }],
          TagRelations: [{ Tag: { Id: TagRelations.split(" - ")[1] } }]
        };

        return new Promise((resolver, reject) =>
          apiCall(
            "/Initiatives",
            payload,
            res => {
              resolver(res)
            },
            err => {
              reject(err)
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
        this.props.history.push("/kpis");
      })
      .catch(err => {
        this.setState({
          loading: false
        });
        toast.error("Something went wrong");
      });
  };
  handlePrevious = () => {
    this.props.history.push("/goals");
  };
  render() {
    const { GoalSource, TagSource, UserSource, loading } = this.state;

    return (
      <>
        <Header />
        <div className="container">
          <SubHeader
            title="Add some strategic initiatives"
            description="Internal programs and projects outside of the organization's day-to-day operational activities,
             that are designed to help the organization achieve its goals. 
            These are the primary methods by which strategy is executed"
          />
          <HotTable
            stretchH="all"
            licenseKey="non-commercial-and-evaluation"
            minSpareRows={1}
            startRows={2}
            data={this.data}
            dataSchema={{
              Name: null,
              Description: null,
              Responsibles: "",
              TagRelations: "",
              Goal: ""
            }}
            columns={[
              { data: "Name" },
              { data: "Description" },
              {
                data: "Responsibles",
                width: 150,
                type: "dropdown",
                source: UserSource
              },
              {
                data: "TagRelations",
                width: 150,
                type: "dropdown",
                source: TagSource
              },
              {
                data: "Goal",
                width: 150,
                type: "dropdown",
                source: GoalSource
              }
            ]}
            colHeaders={[
              "Name",
              "Description",
              "Responsible employees",
              "Tag",
              "Goal"
            ]}
            rowHeaders={false}
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
export default withRouter(Initiatives);
