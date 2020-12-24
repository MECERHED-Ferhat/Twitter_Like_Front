import React, { Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Home from "./mainHome/Home";
import Search from "./mainSearch/Search";
import User from "./mainUser/User";

export default function Main() {
  return (
    <Fragment>
      <Navbar />
      <main id="main">
        <Switch>
          <Redirect exact from="/" to="/home" />

          <Route exact path="/home">
            <Home />
          </Route>

          <Route exact strict path="/search">
            <Search />
          </Route>

          <Route
            path="/:username"
            render={({ match }) => <User match={match} />}
          />
        </Switch>
      </main>
    </Fragment>
  );
}
