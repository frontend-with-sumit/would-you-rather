import React, { Component } from "react";
import { connect } from "react-redux";

class Users extends Component {
  state = {};
  render() {
    const { user } = this.props;

    const { avatarURL, name, handle } = user;
    return (
      <div className="user-info">
        <div className="avatar">
          <img src={avatarURL} alt={name} />
        </div>
        <div className="user-details">
          <span className="name">{name}</span>
          <span className="handle">{handle}</span>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ users }, { id }) {
  const user = users[id];
  return {
    user
  };
}

export default connect(mapStateToProps)(Users);
