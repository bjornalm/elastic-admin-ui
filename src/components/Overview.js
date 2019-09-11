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
  EuiCard,
  EuiIcon,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiStat  
} from "@elastic/eui";
import dataService from "../deploymentsDataService";
import ErrorCallOut from "./ErrorCallOut";
import UnhealthyOverviewTable from "./UnhealthyOverviewTable";
import './Overview.css';
import DeploymentStats from "./DeploymentStats";

class UnhealtyOverview extends Component {

  constructor(props) {
    super(props);
    this.state = {
        loading: true,
        errorMsg: undefined,
        unhealthyDeployments: []
    }
  }

  componentDidMount() {
    // ASSUMPTION: We want auto refresh of data
    // TODO: Currently data is only loaded on navigation between routes,
    // we should implement some long polling or server push via websocket or SSE
    // in order to automatically refresh the data.

    dataService.getDeploymentsOverview().then((overview) => { 
      this.setState({...this.state, 
        loading: false, 
        ...overview
      });

      console.info(this.state);
    }, (err)=> {
      console.error(err);
      this.setState({...this.state, loading: false, errorMsg: 
        'We failed to load the list of deployments, please check your connection and refresh the page.'});
    })        
  }

  render() {
    let unhealthyPanel;
    if (this.state.loading) {
      unhealthyPanel = <Spinner />;
    } else if (this.state.unhealthyDeployments.length > 0){
      unhealthyPanel = (
        <UnhealtyPanel deployments={this.state.unhealthyDeployments}
        regions={this.state.regions} 
        userLevels={this.state.userLevels} />
      );
    } else {
      unhealthyPanel = <p>All deployments are healthy.</p>;
    }
    return (
      <EuiPageBody>        
        <EuiPageHeader>
          <EuiPageHeaderSection>
            <EuiTitle size="l">
              <h1>Deployments Overview</h1>
            </EuiTitle>            
          </EuiPageHeaderSection>     
        </EuiPageHeader>   
        <ErrorCallOut loading={this.state.loading} errorMsg={this.state.errorMsg}></ErrorCallOut>
        <EuiPageContent>          
          <EuiPageContentBody>
            <DeploymentStats 
              total={ this.state.totalNumberOfDeployments }
              unhealthy={ this.state.unhealthyDeployments.length }
              healthy={ this.state.totalNumberOfDeployments - this.state.unhealthyDeployments.length }              
              />

          <EuiFlexGroup gutterSize="l">
            <EuiFlexItem>
              <EuiCard
                icon={<EuiIcon size="xxl" type={`alert`} color="warning" />}
                title={`Unhealthy deployments`}
                description="Example of a card's description. Stick to one or two sentences."
              />
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiCard
                icon={<EuiIcon size="xxl" type={`logoCloud`} />}
                title={`Elastic`}
                description="Example of a card's description. Stick to one or two sentences."
              />
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiSpacer />
          
          {unhealthyPanel}            
          </EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
    );
  }
}

function Spinner() {
  return (<div className="table-loader"><EuiLoadingSpinner size="xl" /></div>);
}

function UnhealtyPanel(props) {
  console.info(props);
  return (    
    <EuiPanel paddingSize="l" hasShadow>
      <EuiPageContentHeader>
        <EuiPageContentHeaderSection>
        <EuiTitle>            
            <h2><EuiIcon size="xxl" type={`alert`} color="warning" /> Unhealthy Deployments</h2>
          </EuiTitle>
        </EuiPageContentHeaderSection>
      </EuiPageContentHeader>
      <UnhealthyOverviewTable 
        deployments={props.deployments} 
        regions={props.regions} 
        userLevels={props.userLevels}>
      </UnhealthyOverviewTable>        
    </EuiPanel>
    );
}

export default UnhealtyOverview;
