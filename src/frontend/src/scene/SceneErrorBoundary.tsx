import { Component, ReactNode } from 'react';

interface SceneErrorBoundaryProps {
  children: ReactNode;
  onError: (error: Error) => void;
  onReset: () => void;
}

interface SceneErrorBoundaryState {
  hasError: boolean;
}

export default class SceneErrorBoundary extends Component<
  SceneErrorBoundaryProps,
  SceneErrorBoundaryState
> {
  constructor(props: SceneErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): SceneErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    this.props.onError(error);
  }

  componentDidUpdate(prevProps: SceneErrorBoundaryProps) {
    // Reset error state when key changes (retry)
    if (this.state.hasError && prevProps.children !== this.props.children) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) {
      return null;
    }

    return this.props.children;
  }
}
