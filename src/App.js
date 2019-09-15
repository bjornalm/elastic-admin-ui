import React, { Component } from "react";
import "./App.scss";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import DeploymentsDashboard from "./components/dashboardScreen/DeploymentsDashboard";
import DeploymentDetails from "./components/detailsScreen/DeploymentDetails";
import DeploymentList from "./components/listScreen/DeploymentList";

import {
  EuiPage,
  EuiPageSideBar,
  EuiHeader,
  EuiHeaderSection,
  EuiHeaderLogo,
  EuiHeaderSectionItem
} from "@elastic/eui";
import { EuiSpacer } from "@elastic/eui";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <EuiHeader>
            <EuiHeaderSection grow={true}>
              <EuiHeaderSectionItem border="right">
                <EuiHeaderLogo href="#" iconType={"logoElastic"} />
              </EuiHeaderSectionItem>
            </EuiHeaderSection>
          </EuiHeader>
          <EuiPage>
            <EuiPageSideBar>
              <EuiSpacer />
              <Link to="/">Dashboard</Link>
              <EuiSpacer />
              <Link to="/list">Deployments list</Link>
            </EuiPageSideBar>
            <Switch>
              <Route exact path="/" component={DeploymentsDashboard} />
              <Route path="/deployment/:id" component={DeploymentDetails} />
              <Route path="/list" component={DeploymentList} />
            </Switch>
          </EuiPage>
        </div>
      </Router>
    );
  }

  detFetchinDataDone() {
    this.setState({ ...this.state, isFetching: false });
  }
}

export default App;
