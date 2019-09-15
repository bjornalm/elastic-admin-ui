import React, { Component } from "react";
import { EuiCallOut, EuiLink, EuiSpacer } from "@elastic/eui";

class ErrorCallOut extends Component {
  render() {
    if (this.props.loading || !this.props.errorMsg) {
      return null;
    } else {
      return (
        <div>
          <EuiCallOut
            title="Sorry, there was an error"
            color="danger"
            iconType="alert"
          >
            <p>{this.props.errorMsg}</p>
            <p>
              <EuiLink href="#">this link can help</EuiLink>.
            </p>
          </EuiCallOut>
          <EuiSpacer />
        </div>
      );
    }
  }
}

export default ErrorCallOut;
