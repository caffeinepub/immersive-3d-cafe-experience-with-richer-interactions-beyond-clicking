import { Component, ReactNode } from 'react';

interface SceneErrorBoundaryProps {
  children: ReactNode;
  onError: (error: Error) => void;
  onReset: () => void;
  resetKey?: number;
}

interface SceneErrorBoundaryState {
  hasError: boolean;
  errorCount: number;
}

export default class SceneErrorBoundary extends Component<
  SceneErrorBoundaryProps,
  SceneErrorBoundaryState
> {
  constructor(props: SceneErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorCount: 0 };
  }

  static getDerivedStateFromError(): Partial<SceneErrorBoundaryState> {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    this.setState(prev => ({ errorCount: prev.errorCount + 1 }));
    this.props.onError(error);
  }

  componentDidUpdate(prevProps: SceneErrorBoundaryProps) {
    // Reset error state when resetKey changes (retry attempt)
    if (this.props.resetKey !== undefined && 
        prevProps.resetKey !== this.props.resetKey && 
        this.state.hasError) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) {
      // Return null to let parent handle error display via overlay
      return null;
    }

    return this.props.children;
  }
}
