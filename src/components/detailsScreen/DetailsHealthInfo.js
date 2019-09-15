import React, { Component } from "react";

import {
  EuiSpacer,
  EuiDescriptionList,
  EuiHealth
} from "@elastic/eui";


class DetailsHealthInfo extends Component {
  
  render() {
    const divStyle = {
      minWidth: '170px',
    };
    
    const healthyIcon =  this.props.healthy ? <EuiHealth color="success">Healthy</EuiHealth> : 
    <EuiHealth color="danger">Unhealthy</EuiHealth>

    return (
      <div style={divStyle}>
        <h3>{this.props.name}</h3>
        <EuiSpacer size="s"/>
          { healthyIcon }
        <EuiSpacer />
        <EuiDescriptionList compressed={true} type="column" textStyle="reverse" listItems={this.props.list} />
      </div>
    );
  }
}

export default DetailsHealthInfo;