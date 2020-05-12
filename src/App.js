import React from "react";
import "handsontable/dist/handsontable.full.css";
import history from "./history";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { routes } from "./routes";
import "./styles.css";
class App extends React.Component {
  render() {
    return (
      <>
        <Router history={history} basename={'/onboarding'}>
          <div>
            <Switch>
              {routes.map(route => (
                <Route {...route} />
              ))}
            </Switch>
          </div>
        </Router>
        <ToastContainer
          position="bottom-right"
          autoClose={1500}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
      </>
    );
  }
}

export default App;
