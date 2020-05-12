import React, { Component } from "react";
export default class Header extends Component {
  render() {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <a className="navbar-brand" href="#">
              <img src="./asset/images/logo.png" width="300px" alt="Strategy Orchestrator" />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarsExample07"
              aria-controls="navbarsExample07"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarsExample07">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a className="nav-link" href="https://www.strategyorchestrator.com/">
                    Homepage
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="https://www.youtube.com/channel/UCd7i0n8-FFay3grijZXlbuQ">
                    Intro videos
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="hero">
          <div className="container">
            <h1>Get Started with Strategy Orchestrator</h1>
            <p className="lead">Create an account and add some data</p>
          </div>
        </div>
      </>
    );
  }
}
