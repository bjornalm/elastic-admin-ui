import React, { Component } from "react";
import {
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiPageContent,
  EuiPageContentBody,
  EuiTitle,
  EuiPageBody,
  EuiLoadingSpinner,
  EuiSpacer
} from "@elastic/eui";
import dataService from "../../deploymentsDataService";
import ErrorCallOut from "../ErrorCallOut";
import DeploymentsListTable from "./DeploymentsListTable";

class DeploymentsList extends Component {

  constructor(props) {
    super(props);
    this.state = {
        loading: true,
        errorMsg: undefined
    }
  }

  componentDidMount() {
    dataService.getDeploymentList().then(deploymentsListsModel => { 
      this.setState({...this.state, 
        loading: false, 
        ...deploymentsListsModel 
      });
    }, (err)=> {
      console.error(err);
      this.setState({...this.state, loading: false, errorMsg: 
        'We failed to load the list of deployments, please check your connection and refresh the page.'});
    })        
  }

  renderDeployements() {
    if (this.state.loading) { return <EuiLoadingSpinner size="xl" /> }

    return (
        <DeploymentsListTable 
          deployments={this.state.deployments} 
          regions={this.state.regions} 
          userLevels={this.state.userLevels}>
        </DeploymentsListTable>        
    );
  }

  render() {
    return (
      <EuiPageBody>        
        <EuiPageHeader>
          <EuiPageHeaderSection>
            <EuiTitle size="l">
              <h1>Deployments List</h1>
            </EuiTitle>            
          </EuiPageHeaderSection>     
        </EuiPageHeader>   
        <ErrorCallOut loading={this.state.loading} errorMsg={this.state.errorMsg}></ErrorCallOut>
        <EuiPageContent>          
          <EuiPageContentBody>
            <EuiSpacer />
            { this.renderDeployements() }
          </EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
    );
  }
}

export default DeploymentsList;
