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
              title={loadingIssueWorkaround(this.props.total)}
              description="Total"
              textAlign="right"
            >
              <EuiIcon type="empty" />
            </EuiStat>
          </EuiPanel>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiPanel>
            <EuiStat
              title={loadingIssueWorkaround(this.props.unhealthy)}
              description="Unhealthy"
              titleColor="danger"
              textAlign="right"
            >
              <EuiIcon type="alert" color="danger" />
            </EuiStat>
          </EuiPanel>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiPanel>
            <EuiStat
              title={loadingIssueWorkaround(this.props.healthy)}
              description="Healthy"
              titleColor="secondary"
              textAlign="right"
            >
              <EuiIcon type="check" color="secondary" />
            </EuiStat>
          </EuiPanel>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiPanel>
            <EuiStat
              title={loadingIssueWorkaround(this.props.totalKibana)}
              description="Kibana enabled"
              textAlign="right"
            >
              <EuiIcon type="logoKibana" />
            </EuiStat>
          </EuiPanel>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiPanel>
            <EuiStat
              title={loadingIssueWorkaround(this.props.totalMonitoring)}
              description="Monitoring enabled"
              textAlign="right"
            ></EuiStat>
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
    );
  }
}

// The EuiStat isLoading property is not working properly
// this is a workaround.
function loadingIssueWorkaround(val) {
  return val !== undefined ? val : "---";
}

export default DeploymentStatsGroup;
