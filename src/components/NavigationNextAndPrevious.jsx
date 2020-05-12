import React, { Component } from "react";
import { withRouter } from "react-router-dom";
class NavigationNextAndPrevious extends Component {
  handlePreviousLink = link => {
    this.props.history.push(link);
  };
  render() {
    const {
      handlePreviousLink,
      classNamePreviousbtn,
      classNameNextbtn,
      previousLink,
      ClassNameDiv,
      previousClick,
      nextClick,
      notNext,
      notPrevious
    } = this.props;
    return (
      <div className={"d-flex flex-row justify-content-between " + ClassNameDiv}>
        {!notPrevious && (
          <div className="text-left">
            <button
              type="button"
              className={classNamePreviousbtn}
              onClick={previousClick}
              style={{ marginRight: 30 }}
            >
              Previous
            </button>
          </div>
        )}
        {!notNext && (
          <div className="text-right">
            <button
              type="button"
              style={{ marginRight: 30 }}
              className={classNameNextbtn}
              onClick={nextClick}
            >
              Next
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(NavigationNextAndPrevious);

NavigationNextAndPrevious.defaultProps = {
  classNameNextbtn: "btn btn-lg btn-primary",
  classNamePreviousbtn: "btn btn-lg btn-primary",
  ClassNameDiv: "mt-2"
};
