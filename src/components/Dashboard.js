import React, { Component } from "react";
import { connect } from "react-redux";
import Questions from "./Questions";

class Dashboard extends Component {
  state = {};
  render() {
    const { questionIds } = this.props;
    return (
      <div>
        <h3 className="heading center heading-primary">Your Timeline</h3>
        <ul>
          {questionIds.map(id => (
            <li key={id}>
              <Questions id={id}></Questions>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ questions }) {
  return {
    questionIds: Object.keys(questions).sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    )
  };
}

export default connect(mapStateToProps)(Dashboard);
