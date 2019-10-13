import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink, Link, Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { setAuthedUser } from "../actions/authedUser";

class Navbar extends Component {
  state = {
    toLogin: false
  };

  handleLogout = () => {
    this.props.setAuthedUser(null);
    this.setState({ toLogin: true });
  };

  render() {
    const { toLogin } = this.state;
    if (toLogin) return <Redirect to="/login"></Redirect>;

    const { authedUser, user } = this.props;

    const { avatarURL, name } = user;
    return (
      <nav className="navbar">
        <ul className="nav-list">
          <li className="nav-list-items">
            <NavLink to="/dashboard">Home</NavLink>
          </li>
          <li className="nav-list-items">
            <NavLink to="/new">New Poll</NavLink>
          </li>
          <li className="nav-list-items">
            <NavLink to="/leaderboard">Leaderboard</NavLink>
          </li>
          {authedUser ? (
            <li className="nav-list-items">
              <img src={avatarURL} alt={name} className="login-avatar" />
              <input type="checkbox" id="check" className="logout-check" />
              <label htmlFor="check">
                <FontAwesomeIcon
                  icon={faSortDown}
                  className="down-arrow-icon"
                ></FontAwesomeIcon>
              </label>
              <div className="dropdown">
                <ul>
                  <li>
                    <span className="">{name}</span>
                  </li>
                  <li>
                    <div className="logout">
                      <FontAwesomeIcon
                        icon={faSignOutAlt}
                        className="sign-out"
                      ></FontAwesomeIcon>
                      <span
                        className="dropdown-item"
                        onClick={this.handleLogout}
                      >
                        Logout
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </li>
          ) : (
            <li class="nav-list-items">
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </nav>
    );
  }
}

function mapStateToProps({ authedUser, users }, { id }) {
  const user = users[id];
  return {
    authedUser,
    user
  };
}

export default connect(
  mapStateToProps,
  { setAuthedUser }
)(Navbar);
