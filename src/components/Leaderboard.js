import React, { Component } from "react";
import { connect } from "react-redux";

class Leaderboard extends Component {
  render() {
    const { userIds, users } = this.props;

    console.log(users);
    return (
      <div className="container mt-10">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Questions Created</th>
              <th>Answered Questions</th>
              <th>Total Score</th>
            </tr>
          </thead>
          <tbody>
            {userIds.map(id => (
              <tr key={id}>
                <td>{users[id].name}</td>
                <td>{users[id].questions.length}</td>
                <td>{Object.keys(users[id].answers).length}</td>
                <td>
                  {users[id].questions.length +
                    Object.keys(users[id].answers).length}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users,
    userIds: Object.keys(users)
  };
}
export default connect(mapStateToProps)(Leaderboard);
