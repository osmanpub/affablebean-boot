import React, { Component } from "react";

type State = {
  error: any;
  errorInfo: any;
};

export default class ErrorBoundary extends Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error: any, errorInfo: any) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.errorInfo) {
      // Error path
      const error = this.state.error;

      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: "pre-wrap" }}>
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
