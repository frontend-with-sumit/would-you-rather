import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { formatQuestion, formatDate } from "../utils/helper";

class Questions extends Component {
  render() {
    const { question, id } = this.props;

    if (question === null)
      return (
        <div className="container">
          <p className="not-exist">This question doesn't exist.</p>
        </div>
      );

    const { name, timestamp, avatar, optionOne, optionTwo } = question;

    return (
      <div className="container">
        <div className="question-wrapper">
          <div className="user-info">
            <div className="avatar">
              <img src={avatar} alt={name} />
            </div>
            <div className="user-details">
              <span className="name">{name}</span>
              <span className="date">{formatDate(timestamp)}</span>
            </div>
          </div>
          <div className="question">
            <h3 className="heading">Would you rather?</h3>
            <div className="options">
              <h3 className="option-1 option">{optionOne.text}</h3>
              <h3 className="option-2 option">{optionTwo.text}</h3>
            </div>
            <Link to={`/question/${id}`} className="submit-poll">
              Answer Poll
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
  const question = questions[id];
  return {
    authedUser,
    question: question ? formatQuestion(question, users[question.author]) : null
  };
}

export default connect(mapStateToProps)(Questions);
