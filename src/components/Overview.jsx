import React from "react";
import Header from "./Header";
import SubHeader from "./SubHeader";

export default function Overview(props) {
  return (
    <>
      <Header />
      <div className="container">
        <SubHeader
          title="Final Note"
          description="You are about to be redirected to the main application. There are 4 things you should
          do next to understand better how the application will work for you and your organisation:
          1) Add some divisions and edit goals and KPI's to link them to the correct department
          2) Set some targets on your KPI's. Please also set both targets and actual values on historic periods
          3) Set status on some of your initiatives and goals
          4) Click on each goal in the strategymap to understand the drilldown options in the application"
        />
        <p>
          Thanks for registering data with the Getting Started wizard.{" "}  
          
        </p>
        <p><a href="https://app.strategyorchestrator.com">Click here</a> to open Strategy Orchestrator</p>
      </div>
    </>
  );
}
