import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class PollResults extends Component {
  handleVotes = votes => {
    return (votes / 10) * 100;
  };

  render() {
    const { optionOneVotes, optionTwoVotes } = this.props;
    return (
      <div className="question-result">
        <div className="question-1">
          <span>Option A</span>
          <progress
            max="100"
            value={this.handleVotes(optionOneVotes)}
          ></progress>
          <div className="progress">
            <span className="value">{optionOneVotes}%</span>
            <span className="votes">
              <strong>{optionOneVotes}</strong> out of <strong>10</strong>
            </span>
          </div>
        </div>
        <div className="question-2">
          <span>Option B</span>
          <progress
            max="100"
            value={this.handleVotes(optionTwoVotes)}
          ></progress>
          <div className="progress">
            <span className="value">{optionTwoVotes}%</span>
            <span className="votes">
              <strong>{optionTwoVotes}</strong> out of <strong>10</strong>
            </span>
          </div>
        </div>
        <Link to="/dashboard" className="go-back center">
          Go back
        </Link>
      </div>
    );
  }
}

function mapStateToProps({ questions }, { id }) {
  const question = questions[id];
  return {
    optionOneVotes: question.optionOne.votes.length,
    optionTwoVotes: question.optionTwo.votes.length
  };
}

export default connect(mapStateToProps)(PollResults);
