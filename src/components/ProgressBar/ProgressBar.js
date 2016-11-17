import React, { Component } from 'react';

class ProgressBar extends Component {
  render() {
    return (
      <progress className="progress" value="70" max="100" aria-describedby="example"></progress>
    );
  }
}

export default ProgressBar;
