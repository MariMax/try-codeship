import React, { Component } from 'react';
import './App.css';

import PageTasksList from './pages/PageTasksList/PageTasksList';
import PageEditTask from './pages/PageEditTask/PageEditTask';

class App extends Component {
  render() {
    return (
        <PageTasksList categories={this.props.categories} tasks={this.props.tasks}/>
    );
  }
}

export default App;
