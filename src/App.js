import React, { Component } from "react";
import "./App.scss";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Overview from "./components/Overview";
import NewRoute from "./components/NewRoute";

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
              <Link to="/">Home</Link>
              <EuiSpacer/>
              <Link to="/new">Additional Route</Link>
            </EuiPageSideBar>
            <Switch>
              <Route exact path="/" component={Overview} />
              <Route path="/deployment" component={NewRoute} />
            </Switch>
          </EuiPage>
        </div>
      </Router>
    );
  }

  detFetchinDataDone() {
    this.setState({...this.state, isFetching: false});
  }
}

export default App;
