import React, { Component } from "react";
import {
  EuiPanel,
  EuiIcon,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiStat  
} from "@elastic/eui";

class DeploymentStats extends Component { 
  render() {
    return (
      <div>
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiPanel>        
              <EuiStat
                title={this.props.total}
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
                title={this.props.unhealthy}
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
                title={this.props.healthy}
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
                title="88"
                description="Error widgets"
                titleColor="danger"
                textAlign="right"
                >
                <EuiIcon type="alert" color="danger" />
              </EuiStat>
            </EuiPanel>
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer />
      </div>
    )
  }
}

export default DeploymentStats;