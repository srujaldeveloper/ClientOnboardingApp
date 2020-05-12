import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { HotTable } from "@handsontable/react";
import apiCall, { METHOD, token } from "../baseUrl";
import { toast } from "react-toastify";
import NavigationNextAndPrevious from "./NavigationNextAndPrevious";
import { frequencies } from "../constants/constant";
import "handsontable/dist/handsontable.full.css";
import SubHeader from "./SubHeader";
import Header from "./Header";
import Loading from "./Loading";

class Kpis extends Component {
  constructor(props) {
    super(props);
    this.data = [
      { Name: "Monthly sales delta", Frequency: "Weekly - 7" },
      { Name: "Helpdesk tickets turnover time", Frequency: "Monthly - 30" },
      { Name: "Customer satisfaction", Frequency: "Quarterly - 90" }
    ];

    this.state = {
      showSuccessText: false,
      Perspectives: [],
      Goals: []
    };
  }

  componentDidMount() {
    this.getTags();
    this.getUsers();
    this.getGoals();
    this.getUnits();
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
  getUnits = () => {
    apiCall(
      "/Units",
      {},
      res => {
        this.setState({
          UnitSource: res.map(d => `${d.LanguageKeyName}(${d.Type}) - ${d.Id}`)
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
      const {
        Name,
        Description,
        Goal,
        Responsibles,
        TagRelations,
        Frequency,
        Unit
      } = item;

      if (Name) {
        let payload = {
          ...item,
          Goal: { Id: Goal.split(" - ")[1] },
          Responsibles: [{ Id: Responsibles.split(" - ")[1] }],
          TagRelations: [{ Tag: { Id: TagRelations.split(" - ")[1] } }],
          Unit: { Id: Unit.split(" - ")[1] },
          Frequency: Frequency.split(" - ")[1].trim()
        };

        return new Promise((resolver, reject) =>
          apiCall(
            "/Kpis",
            payload,
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
        toast.success("Success Notification !");
        this.props.history.push("/overview");
      })
      .catch(err => {
        this.setState({
          loading: false
        });
        toast.error("Something went wrong");
      });
  };
  handlePrevious = () => {
    this.props.history.push("/initiatives");
  };
  render() {
    const {
      GoalSource,
      TagSource,
      UserSource,
      UnitSource,
      loading
    } = this.state;

    return (
      <>
        <Header></Header>
        <div className="container">
          <SubHeader
            title="Add some KPIs"
            description="For each objective on the strategy map, at least one measure or Key Performance Indicator (KPI) will be identified and tracked over time. KPIs indicate progress toward a desirable outcome. Strategic KPIs monitor the implementation and effectiveness of an organization’s strategies, determine the gap between actual and targeted performance and determine organization effectiveness and operational efficiency."
          />
          <HotTable
            stretchH="all"
            licenseKey="non-commercial-and-evaluation"
            minSpareRows={1}
            startRows={2}
            data={this.data}
            dataSchema={{
              Name: null,
              Frequency: "",
              Unit: "",
              Responsibles: "",
              TagRelations: "",
              Goal: "",
              Description: null
            }}
            columns={[
              { data: "Name" },
              {
                data: "Frequency",
                width: "150",
                type: "dropdown",
                source: frequencies
              },
              {
                data: "Unit",
                width: "150",
                type: "dropdown",
                source: UnitSource
              },
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
              },
              { data: "Description" }
            ]}
            colHeaders={[
              "Name",
              "Frequency",
              "Unit",
              "Responsible employee",
              "Tag",
              "Goal",
              "Description"
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

export default withRouter(Kpis);
