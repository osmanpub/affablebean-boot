import React, { Component } from "react";
import { ErrorBoundaryState } from "../../interfaces/state";

export class ErrorBoundary extends Component<any, ErrorBoundaryState> {
    constructor(props: any) {
      super(props);
      this.state = { error: null, errorInfo: null };
    }
    
    componentDidCatch(error: any, errorInfo: any) {
      // Catch errors in any components below and re-render with error message
      this.setState({
        error: error,
        errorInfo: errorInfo
      })
      // You can also log error messages to an error reporting service here
    }
    
    render() {
      if (this.state.errorInfo) {
        // Error path
        const error = this.state.error;

        return (
          <div>
            <h2>Something went wrong.</h2>
            <details style={{ whiteSpace: 'pre-wrap' }}>
              {error && error.toString()}
              <br />
              {this.state.errorInfo.componentStack}
            </details>
          </div>
        );
      }

      // Normally, just render children
      return this.props.children;
    }  
  }
  