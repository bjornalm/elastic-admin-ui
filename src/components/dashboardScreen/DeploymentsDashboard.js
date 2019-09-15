import React, { Component } from "react";
import {
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageContentHeaderSection,
  EuiPageContentHeader,
  EuiTitle,
  EuiPageBody,
  EuiLoadingSpinner,
  EuiPanel,
  EuiIcon,
  EuiSpacer,
  EuiHealth
} from "@elastic/eui";
import dataService from "../../deploymentsDataService";
import ErrorCallOut from "../ErrorCallOut";
import UnhealthyOverviewTable from "./UnhealthyOverviewTable";
import DeploymentStatsGroup from "./DeploymentStatsGroup";

class DeploymentsDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      errorMsg: undefined
    };
  }

  componentDidMount() {
    // ASSUMPTION: We want auto refresh of data
    // TODO: Currently data is only loaded on navigation between routes,
    // we should implement some long polling or server push via websocket or SSE
    // in order to automatically refresh the data.

    dataService.getDeploymentsDashboard().then(
      dashboardModel => {
        this.setState({ ...this.state, loading: false, ...dashboardModel });
      },
      err => {
        console.error(err);
        this.setState({
          ...this.state,
          loading: false,
          errorMsg:
            "We failed to load the list of deployments, please check your connection and refresh the page."
        });
      }
    );
  }

  renderUnhealthyDeployments() {
    return (
      <EuiPanel paddingSize="l" hasShadow>
        <EuiPageContentHeader>
          <EuiPageContentHeaderSection>
            <EuiTitle>
              <h2>
                <EuiIcon size="xxl" type={`alert`} color="danger" /> Unhealthy
                Deployments
              </h2>
            </EuiTitle>
          </EuiPageContentHeaderSection>
        </EuiPageContentHeader>
        <EuiHealth color="success">= Healthy</EuiHealth>
        <EuiHealth color="danger">= Unhealthy</EuiHealth>
        <EuiSpacer />
        <UnhealthyOverviewTable
          deployments={this.state.unhealthyDeployments}
          regions={this.state.regions}
          userLevels={this.state.userLevels}
        ></UnhealthyOverviewTable>
      </EuiPanel>
    );
  }

  renderHealthPanel() {
    if (this.state.loading) {
      return <EuiLoadingSpinner size="xl" />;
    }

    return this.state.unhealthyDeployments.length ? (
      this.renderUnhealthyDeployments()
    ) : (
      <EuiPanel paddingSize="l">All deployments are healthy.</EuiPanel>
    );
  }

  renderStats() {
    const unhealthy =
      this.state.unhealthyDeployments && this.state.unhealthyDeployments.length;
    return (
      <DeploymentStatsGroup
        total={this.state.totalNumberOfDeployments}
        unhealthy={unhealthy}
        healthy={this.state.totalHealthyDeployments}
        totalKibana={this.state.totalKibana}
        totalMonitoring={this.state.totalMonitoring}
      />
    );
  }

  render() {
    return (
      <EuiPageBody>
        <EuiPageHeader>
          <EuiPageHeaderSection>
            <EuiTitle size="l">
              <h1>Deployments Dashboard</h1>
            </EuiTitle>
          </EuiPageHeaderSection>
        </EuiPageHeader>
        <ErrorCallOut
          loading={this.state.loading}
          errorMsg={this.state.errorMsg}
        ></ErrorCallOut>
        <EuiPageContent>
          <EuiPageContentBody>
            {this.renderStats()}
            <EuiSpacer />
            {this.renderHealthPanel()}
          </EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
    );
  }
}

export default DeploymentsDashboard;
