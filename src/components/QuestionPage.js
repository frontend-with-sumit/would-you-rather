import React, { Component } from "react";
import { connect } from "react-redux";
import { formatQuestion, formatDate } from "../utils/helper";
import PollResults from "./PollResults";
import { handleSaveAnswer } from "../actions/shared";
import { saveAnswerToUser } from "../actions/users";

class QuestionPage extends Component {
  state = {
    option: "",
    answerSubmitted: false
  };

  handleSubmit = e => {
    e.preventDefault();
    const { authedUser, question, dispatch } = this.props;
    const { option } = this.state;

    dispatch(
      handleSaveAnswer({
        authedUser,
        qid: question.id,
        answer: option
      })
    );

    dispatch(
      saveAnswerToUser({
        authedUser,
        qid: question.id,
        answer: option
      })
    );

    this.setState({
      answerSubmitted: true
    });
  };

  handleChange = e => {
    this.setState({ option: e.target.value });
  };

  render() {
    const { option, answerSubmitted } = this.state;
    const { question, id } = this.props;
    if (question === null)
      return (
        <div className="container mt-10">
          <p className="not-exist">This question doesn't exist.</p>
        </div>
      );
    const { name, timestamp, avatar, optionOne, optionTwo } = question;

    return (
      <div className="container mt-10">
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
            <form className="question-answer-form" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input
                  type="radio"
                  id="answer-a"
                  name="answer"
                  value="optionOne"
                  onChange={this.handleChange}
                />
                <label htmlFor="answer-a" className="answer-a">
                  {optionOne.text}
                </label>

                <input
                  type="radio"
                  id="answer-b"
                  name="answer"
                  value="optionTwo"
                  onChange={this.handleChange}
                />
                <label htmlFor="answer-b" className="answer-b">
                  {optionTwo.text}
                </label>
              </div>
              {option ? (
                <button
                  type="submit"
                  className="btn"
                  disabled={answerSubmitted}
                >
                  Submit
                </button>
              ) : null}
            </form>
          </div>
          {answerSubmitted ? <PollResults id={id}></PollResults> : null}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }, props) {
  const { id } = props.match.params;
  const question = questions[id];

  return {
    id,
    authedUser,
    question: question ? formatQuestion(question, users[question.author]) : null
  };
}

export default connect(mapStateToProps)(QuestionPage);
