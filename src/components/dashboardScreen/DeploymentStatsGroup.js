import React, { Component } from "react";
import {
  EuiPanel,
  EuiIcon,
  EuiFlexGroup,
  EuiFlexItem,
  EuiStat
} from "@elastic/eui";

class DeploymentStatsGroup extends Component {
  render() {
    return (
      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiPanel>
            <EuiStat
              title={this.props.total}
              description="Total"
              textAlign="right"
              isLoading={this.props.loading}
            >
              <EuiIcon type="empty" />
            </EuiStat>
          </EuiPanel>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiPanel>
            <EuiStat
              title={this.props.unhealthy}
              description="Unhealthy"
              titleColor="danger"
              textAlign="right"
              isLoading={this.props.loading}
            >
              <EuiIcon type="alert" color="danger" />
            </EuiStat>
          </EuiPanel>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiPanel>
            <EuiStat
              title={this.props.healthy}
              description="Healthy"
              titleColor="secondary"
              textAlign="right"
              isLoading={this.props.loading}
            >
              <EuiIcon type="check" color="secondary" />
            </EuiStat>
          </EuiPanel>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiPanel>
            <EuiStat
              title={this.props.totalKibana}
              description="Kibana enabled"
              textAlign="right"
              isLoading={this.props.loading}
            >
              <EuiIcon type="logoKibana" />
            </EuiStat>
          </EuiPanel>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiPanel>
            <EuiStat
              title={this.props.totalMonitoring}
              description="Monitoring enabled"
              textAlign="right"
              isLoading={this.props.loading}
            ></EuiStat>
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
    );
  }
}

// The EuiStat doesn't handle undefined input,
// not even when isLoading = true.
DeploymentStatsGroup.defaultProps = {
  total: "",
  unhealthy: "",
  healthy: "",
  totalKibana: "",
  totalMonitoring: ""
};

export default DeploymentStatsGroup;
