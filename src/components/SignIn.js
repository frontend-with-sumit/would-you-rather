import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { setAuthedUser } from "../actions/authedUser";
import Users from "./Users";

class SignIn extends Component {
  state = {
    toDashboard: false
  };

  handleAuthedUser = authedUserId => {
    const { setAuthedUser } = this.props;
    new Promise((res, rej) => {
      setTimeout(() => res(), 500);
    }).then(() => setAuthedUser(authedUserId));

    this.setState({ toDashboard: true });
  };

  render() {
    const { toDashboard } = this.state;

    if (toDashboard) return <Redirect to="/dashboard"></Redirect>;

    const { userIds } = this.props;
    return (
      <ul className="register-user">
        <h3>Sign In</h3>
        {userIds.map(id => (
          <li
            key={id}
            className="register-user-list-item"
            style={{ cursor: "pointer" }}
            onClick={() => this.handleAuthedUser(id)}
          >
            <Users id={id}></Users>
          </li>
        ))}
      </ul>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    userIds: Object.keys(users)
  };
}
export default connect(
  mapStateToProps,
  { setAuthedUser }
)(SignIn);
