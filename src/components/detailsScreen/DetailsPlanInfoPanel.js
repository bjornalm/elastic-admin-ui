import React, { Component } from "react";

import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiAccordion,
  EuiText,
  EuiListGroup,
  EuiListGroupItem,
  EuiPanel
} from "@elastic/eui";

import { createDescriptionList } from "../../helpers";
import DetailsHealthInfo from "./DetailsHealthInfo";

class DetailsPlanInfoPanel extends Component {
  render() {
    const plan = this.props.plan;
    const planList = createDescriptionList(
      [
        "isActive",
        "isPending",
        "instanceCapacity",
        "instanceCount",
        "availabilityZones"
      ],
      plan
    );

    const test = plan.configurationSteps.map((step, index) => (
      <EuiListGroupItem
        key={index}
        size="s"
        label={
          <span>
            <b>Time:</b> {step.time}
            <b>ok:</b> {step.ok.toString()}
            <b>type:</b> {step.type}
            <b>value:</b> {step.value}
          </span>
        }
      />
    ));

    return (
      <EuiPanel>
        <EuiFlexGroup gutterSize="l">
          <EuiFlexItem>
            <DetailsHealthInfo
              name={`Plan (${plan.version})`}
              healthy={plan.healthy}
              list={planList}
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiSpacer />
            <EuiAccordion
              id="accordion1"
              buttonContent={
                <EuiText size="xs">Show configuration Steps</EuiText>
              }
            >
              <EuiSpacer />
              <EuiListGroup maxWidth={false}>{test}</EuiListGroup>
            </EuiAccordion>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPanel>
    );
  }
}

export default DetailsPlanInfoPanel;
