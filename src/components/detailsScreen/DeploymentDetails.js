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
  EuiIcon,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHorizontalRule,
  EuiButtonEmpty
} from "@elastic/eui";

import dataService from "../../deploymentsDataService";
import DetailsCardGroup from "./DetailsCardGroup";
import DetailsPlanInfoPanel from "./DetailsPlanInfoPanel";
import DetailsHealthInfoGroup from "./DetailsHealthInfoGroup";

class DeploymentDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
        loading: true,
        errorMsg: undefined
    }
  }

  componentDidMount() {
    const deploymentId = this.props.match.params.id;
    dataService.getDeploymentDetails(deploymentId).then(details => { 
      this.setState({...this.state, 
        loading: false,
        details: details
      });
    }, (err)=> {
      console.error(err);
      this.setState({...this.state, loading: false, errorMsg: 
        'We failed to load the list of deployments, please check your connection and refresh the page.'});
    })        
  }

  renderPageContentHeader() {
    return (
        <EuiPageContentHeader>
          <EuiPageContentHeaderSection>
            <EuiTitle>
              <h2>{this.state.details.displayName}</h2>
            </EuiTitle>
          </EuiPageContentHeaderSection>                 
        </EuiPageContentHeader>      
    )
  }

  renderTopSectionGroup() {
    const details = this.state.details;
    return (
      <EuiFlexGroup alignItems="baseline" gutterSize="l">                 
        <EuiFlexItem>
          <div>
            <EuiIcon size="xxl" type={`dot`} color={ details.healthy ? '#490' : 'danger'}/>
            <span>{details.healthy ? 'Healthy' : 'Unhealthy'}</span>
          </div>
        </EuiFlexItem>
        <EuiFlexItem>
          <div><b>Region:</b> {details.regionId}</div>            
        </EuiFlexItem>
        <EuiFlexItem grow={2}>
          <div><b>ID:</b> {details.id}  </div>
        </EuiFlexItem>
      </EuiFlexGroup>       
    )
  }

  renderPageContent() {
    if (this.state.loading) { return <EuiLoadingSpinner size="xl" /> }
    
    const details = this.state.details;    
    
    return (
      <EuiPageContent>
        { this.renderPageContentHeader() }
        { this.renderTopSectionGroup() }
               
        <EuiHorizontalRule margin="l" />                
        <EuiPageContentBody>
          <DetailsCardGroup 
            isStopped={details.isStopped} 
            monitoring={details.monitoring}
            user={details.user}
            kibana={details.kibana}
          />

          <EuiHorizontalRule margin="l" />
          <DetailsHealthInfoGroup 
            master={details.master} 
            shards={details.shards}
            instances={details.instances}
            snapshots={details.snapshots}/>
          
          <EuiFlexGroup gutterSize="l">
            <EuiFlexItem grow={2}>
              <DetailsPlanInfoPanel plan={details.plan}/>
            </EuiFlexItem> 
          </EuiFlexGroup>          
        </EuiPageContentBody>      
      </EuiPageContent>
    );
  }

  render() {
    return (
      <EuiPageBody>
        <EuiPageHeader>
          <EuiPageHeaderSection>
            <EuiTitle size="l">
              <h1>Deployment Details</h1>
            </EuiTitle>
            <EuiButtonEmpty iconType="arrowLeft" onClick={() =>this.props.history.goBack()}>
              Back
            </EuiButtonEmpty>                        
          </EuiPageHeaderSection>
        </EuiPageHeader>
        { this.renderPageContent() }
      </EuiPageBody>
    );
  }
}

export default DeploymentDetails;
