import { Component, ReactNode } from 'react';

interface CanvasMountErrorBoundaryProps {
  children: ReactNode;
  onError: (error: Error) => void;
}

interface CanvasMountErrorBoundaryState {
  hasError: boolean;
}

/**
 * Error boundary specifically for catching Canvas mount-time errors
 * that may be WebGL-related
 */
export default class CanvasMountErrorBoundary extends Component<
  CanvasMountErrorBoundaryProps,
  CanvasMountErrorBoundaryState
> {
  constructor(props: CanvasMountErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): Partial<CanvasMountErrorBoundaryState> {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error('[CanvasMountErrorBoundary] Canvas mount error caught:', error);
    this.props.onError(error);
  }

  render() {
    if (this.state.hasError) {
      // Return null to let parent handle error display
      return null;
    }

    return this.props.children;
  }
}
