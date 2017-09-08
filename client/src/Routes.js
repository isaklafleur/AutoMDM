import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import HomePage from "./components/presentationals/HomePage";
import SignUpPage from "./components/containers/SignUpPage";
import LoginPage from "./components/containers/LoginPage";
import DashboardPage from "./components/containers/DashBoardPage";
import eClassTree from "./components/eClassTree";
import SearchParts from "./components/SearchParts";
import SearchTaric from "./components/SearchTaric";
import NotFound from "./components/presentationals/NotFound";
import Navbar from "./components/Navbar";
import Test from "./components/Test";
import Auth from "./modules/Auth";

const Routes = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              if (Auth.isUserAuthenticated()) {
                return <DashboardPage />;
              } else {
                return <HomePage />;
              }
            }}
          />
          <Route path="/dashboard" component={DashboardPage} />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/search-parts" component={SearchParts} />
          <Route path="/search-taric" component={SearchTaric} />
          <Route path="/tree-eclass" component={eClassTree} />
          <Route path="/test" component={Test} />
          <Route
            path="/logout"
            render={() => {
              Auth.deauthenticateUser();
              return <Redirect to={{ pathname: "/login" }} />;
            }}
          />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
};

export default Routes;
