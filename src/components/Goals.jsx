import React from "react";
import "handsontable/dist/handsontable.full.css";
import { HotTable } from "@handsontable/react";
import apiCall, { METHOD, token } from "../baseUrl";
import { withRouter } from "react-router-dom";
import NavigationNextAndPrevious from "./NavigationNextAndPrevious";
import Header from "./Header";
import SubHeader from "./SubHeader";
import Loading from "./Loading";
import { toast } from "react-toastify";
class Goals extends React.Component {
  constructor(props) {
    super(props);
    this.data = [
      { Name: "Increase sales", Description: "" },
      { Name: "Increase employee happiness", Description: "" },
      { Name: "Increase customer satisfaction", Description: "" }
    ];
    this.state = {
      Perspectives: [],
      Goals: []
    };
  }
  handleDataChange = data => {
    this.setState({
      data
    });
  };

  componentDidMount() {
    this.getPerspactive();
    this.getTags();
    this.getUsers();
  }

  getPerspactive = () => {
    apiCall(
      "/Perspectives?isactive=true",
      {},
      res => {
        this.setState({
          PerspectiveSource: res.map(d => d.Name + " - " + d.Id)
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

  handleNext = () => {
    this.setState({
      loading: true
    });
    let promises = [];
    if (!this.data.filter(d =>  d.Name).length) {
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
        Perspective,
        Responsibles,
        TagRelations
      } = item;

      if (Name) {
        let payload = {
          ...item,
          Perspective: { Id: Perspective.split(" - ")[1] },
          Responsibles: [{ Id: Responsibles.split(" - ")[1] }],
          TagRelations: [{ Tag: { Id: TagRelations.split(" - ")[1] } }]
        };
        return new Promise((resolver, reject) =>
          apiCall(
            "/Goals",
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
        this.props.history.push("/initiatives");
        this.setState({
          loading: false
        });
      })
      .catch(err => {
        this.setState({
          loading: false
        });
        toast.error("Something went wrong");
      });
  };
  handlePrevious = () => {
    this.props.history.push("/tags");
  };
  render() {
    const { PerspectiveSource, TagSource, UserSource, loading } = this.state;
    return (
      <>
        <Header />
        <div className="container">
          <SubHeader
            title="Add some strategic goals"
            description="Ideally each corporate or department goal should be:
            Specific – target a specific area for improvement.
            Measurable – quantify or at least suggest an indicator of progress.
            Assignable – specify who will do it.
            Realistic – state what results can realistically be achieved, given available resources.
            Time-related – specify when the result(s) can be achieved."
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
              Perspective: "",
              TagRelations: "",
              Responsibles: ""
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
                data: "Perspective",
                width: 150,
                type: "dropdown",
                source: PerspectiveSource
              }
            ]}
            colHeaders={[
              "Name",
              "Description",
              "Responsible employee",
              "Tag",
              "Perspective"
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

export default withRouter(Goals);
