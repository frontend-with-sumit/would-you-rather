import React, { Component } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import LoadingBar from "react-redux-loading";
import { handleInitialData } from "../actions/shared";
import SignIn from "./SignIn";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";
import QuestionPage from "./QuestionPage";
import NewQuestion from "./NewQuestion";
import Leaderboard from "./Leaderboard";
import NotFound from "./NotFound";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    const { authedUser, loading } = this.props;
    return (
      <Router>
        <>
          <LoadingBar></LoadingBar>
          <div>
            {loading ? (
              <Route path="/" render={() => <SignIn></SignIn>}></Route>
            ) : (
              <>
                <Navbar id={authedUser}></Navbar>
                <Switch>
                  <Route path="/question/:id" component={QuestionPage}></Route>
                  <Route path="/leaderboard" component={Leaderboard}></Route>
                  <Route path="/new" component={NewQuestion}></Route>
                  <Route path="/dashboard" component={Dashboard}></Route>
                  <Route path="/not-found" component={NotFound}></Route>
                  <Redirect to="/not-found"></Redirect>
                </Switch>
              </>
            )}
          </div>
        </>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return { authedUser, loading: authedUser === null };
}

export default connect(mapStateToProps)(App);
