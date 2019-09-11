import React, { Component } from "react";
import {
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageContentHeaderSection,
  EuiPageContentHeader,
  EuiTitle,
  EuiPageBody
} from "@elastic/eui";

// import dataService from "../deploymentsDataService";

class NewRoute extends Component {
  render() {
    return (
      <EuiPageBody>
        <EuiPageHeader>
          <EuiPageHeaderSection>
            <EuiTitle size="l">
              <h1>Deployment details</h1>
            </EuiTitle>
          </EuiPageHeaderSection>
        </EuiPageHeader>
        <EuiPageContent>
          <EuiPageContentHeader>
            <EuiPageContentHeaderSection>
              <EuiTitle>
                <h2>Content title</h2>
              </EuiTitle>
            </EuiPageContentHeaderSection>
          </EuiPageContentHeader>
          <EuiPageContentBody>Content body</EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
    );
  }
}

export default NewRoute;
