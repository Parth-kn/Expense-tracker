import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, err: null };
  }
  static getDerivedStateFromError(err) {
    return { hasError: true, err };
  }
  componentDidCatch(err, info) {
    console.error('UI error:', err, info);
  }
  render() {
    if (this.state.hasError) {
      return <div className="error">Something went wrong in the UI. Please refresh the page.</div>;
    }
    return this.props.children;
  }
}
