import React, { Component } from "react";

import {
  EuiCard,
  EuiIcon,
  EuiFlexGroup,
  EuiFlexItem,
  EuiBadge,
  EuiButtonEmpty
} from "@elastic/eui";

class DetailsCardGroup extends Component {
  render() {
    const { isStopped, monitoring, user, kibana } = this.props;
    const premium = user.isPremium ? (
      <EuiBadge color="primary" iconType="starFilled" iconSide="right">
        {" "}
        Premium{" "}
      </EuiBadge>
    ) : null;

    return (
      <EuiFlexGroup gutterSize="l">
        <EuiFlexItem>
          <EuiCard
            icon={
              <EuiIcon
                size="xxl"
                type={`online`}
                color={isStopped ? "default" : "secondary"}
              />
            }
            title={isStopped ? "Stopped" : "Not stopped"}
            description={`Deployment is ${isStopped ? "stopper" : "running"}`}
          />
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiCard
            icon={
              <EuiIcon
                size="xxl"
                type={`visGauge`}
                color={monitoring.enabled ? "secondary" : "default"}
              />
            }
            title={monitoring.enabled ? "Monitoring" : "No Monitoring"}
            description={
              <span>
                Deployment has monitoring{" "}
                {monitoring.enabled ? "enabled" : "disabled"}
                <ConditionalLink link={monitoring.out} />
              </span>
            }
          />
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiCard
            icon={<EuiIcon size="xxl" type={`user`} />}
            title={`User ${user.id}`}
            description={
              <span>
                {premium}
                <EuiBadge>{user.level}</EuiBadge>
              </span>
            }
          />
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiCard
            icon={<EuiIcon size="xxl" type={`logoKibana`} />}
            title={kibana.enabled ? "Enabled" : "Disabled"}
            description={
              <span>
                Deployment has Kibana {kibana.enabled ? "enabled" : "disabled"}
                <ConditionalLink link={kibana.id} />
              </span>
            }
          />
        </EuiFlexItem>
      </EuiFlexGroup>
    );
  }
}

function ConditionalLink(props) {
  return !props.link ? null : (
    <EuiButtonEmpty iconType="link"> {props.link} </EuiButtonEmpty>
  );
}

export default DetailsCardGroup;
