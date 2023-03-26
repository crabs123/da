import React from "react";
import { GestureResponderEvent } from "react-native";
import ErrorScreen, { IErrorScreenProps } from "./ErrorScreen";

interface IErrorBoundaryProps {
  children: React.ReactNode;
  ErrorScreen: React.ComponentType<IErrorScreenProps>;
  onError?: Function;
}

type State = { error: Error | null };

class ErrorBoundary extends React.Component<IErrorBoundaryProps, State> {
  state: State = { error: null };

  static defaultProps: { ErrorScreen: React.ComponentType<IErrorScreenProps> } = {
    ErrorScreen: ErrorScreen,
  };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, { componentStack }: React.ErrorInfo) {
    if (typeof this.props.onError === "function") {
      this.props.onError.call(this, error, componentStack);
    }
  }

  resetError: (event: GestureResponderEvent) => void = () => {
    console.clear();
    this.setState({ error: null });
  };

  render(): React.ReactNode {
    const { ErrorScreen } = this.props;

    return this.state.error ? (
      <ErrorScreen error={this.state.error} resetError={this.resetError} />
    ) : (
      this.props.children
    );
  }
}

export default ErrorBoundary;
