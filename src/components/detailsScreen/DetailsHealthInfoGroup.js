import React, { Component } from "react";

import {
  EuiDescriptionList,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
  EuiSpacer,
  EuiAccordion,
  EuiText
} from "@elastic/eui";

import { createDescriptionList } from "../../helpers";
import DetailsHealthInfo from "./DetailsHealthInfo";

class DetailsHealthInfoGroup extends Component {
  render() {
    const { master, shards, instances, snapshots } = this.props;

    const masterList = createDescriptionList(["count"], master);
    const shardsList = createDescriptionList(
      ["total", "available", "unavailable"],
      shards.count
    );
    const instancesList = createDescriptionList(
      ["total", "notRunning", "running"],
      instances.count
    );
    const snapshotsList = createDescriptionList(["total"], snapshots.count);
    const latestSnapshotList = createDescriptionList(
      ["name", "success", "time"],
      snapshots.latest
    );

    return (
      <EuiFlexGroup gutterSize="l">
        <FlexItemPanel>
          <DetailsHealthInfo
            name="Master"
            healthy={master.healthy}
            list={masterList}
          />
        </FlexItemPanel>
        <FlexItemPanel>
          <DetailsHealthInfo
            name="Shards"
            healthy={shards.healthy}
            list={shardsList}
          />
        </FlexItemPanel>
        <FlexItemPanel>
          <DetailsHealthInfo
            name="Instances"
            healthy={instances.healthy}
            list={instancesList}
          />
        </FlexItemPanel>

        <FlexItemPanel grow={2}>
          <DetailsHealthInfo
            name="Snapshots"
            healthy={snapshots.healthy}
            list={snapshotsList}
          />
          <EuiSpacer />
          <EuiAccordion
            id="accordion1"
            buttonContent={<EuiText size="xs">Show latest snapshot</EuiText>}
          >
            <EuiSpacer />
            <EuiDescriptionList
              compressed={true}
              type="column"
              listItems={latestSnapshotList}
            />
          </EuiAccordion>
        </FlexItemPanel>
      </EuiFlexGroup>
    );
  }
}

function FlexItemPanel(props) {
  const growVal = props.hasOwnProperty("grow") ? props.grow : 1;
  return (
    <EuiFlexItem grow={growVal}>
      <EuiPanel>{props.children}</EuiPanel>
    </EuiFlexItem>
  );
}

export default DetailsHealthInfoGroup;
