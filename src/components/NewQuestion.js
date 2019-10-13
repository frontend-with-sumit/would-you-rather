import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { handleSaveQuestion } from "../actions/shared";

class NewQuestion extends Component {
  state = {
    optionOne: "",
    optionTwo: "",
    toDashboard: false
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { optionOne, optionTwo } = this.state;

    const { dispatch, authedUser } = this.props;
    dispatch(handleSaveQuestion(optionOne, optionTwo, authedUser));

    this.setState(() => ({
      optionOne: "",
      optionTwo: "",
      toDashboard: true
    }));
  };

  render() {
    const { optionOne, optionTwo, toDashboard } = this.state;

    if (toDashboard) {
      return <Redirect to="/dashboard"></Redirect>;
    }

    return (
      <div>
        <h3 className="heading center heading-primary">Compose new question</h3>
        <div className="container">
          <h3 className="heading">Would you rather?</h3>
          <form className="new-form" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input
                className="option-a"
                type="text"
                name="optionOne"
                value={optionOne}
                onChange={this.handleChange}
                placeholder="Set Option A"
                autoComplete="off"
              />
              <input
                className="option-b"
                type="text"
                name="optionTwo"
                value={optionTwo}
                onChange={this.handleChange}
                placeholder="Set Option B"
                autoComplete="off"
              />
            </div>
            <button
              className="btn"
              type="submit"
              disabled={optionOne === "" || optionTwo === ""}
            >
              POST
            </button>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  };
}

export default connect(mapStateToProps)(NewQuestion);
