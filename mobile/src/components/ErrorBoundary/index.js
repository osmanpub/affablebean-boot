import React, { Component } from "react";
import { Text, View } from "react-native";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    // You can also log error messages to an error reporting service here
  }

  render() {
    if (this.state.errorInfo) {
      // Error path
      const error = this.state.error;

      return (
        <View>
          <Text style={{ fontWeight: "bold", paddingBottom: 8 }}>
            Something went wrong.
          </Text>
          <Text style={{ paddingBottom: 8 }}>{error && error.toString()}</Text>
          <Text>{this.state.errorInfo.componentStack}</Text>
        </View>
      );
    }

    // Normally, just render children
    return this.props.children;
  }
}
