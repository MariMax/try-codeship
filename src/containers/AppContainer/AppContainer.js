import React, { Component } from 'react';

class AppContainer extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default AppContainer;
