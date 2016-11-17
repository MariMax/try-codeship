import React, { Component } from 'react';
import './App.css';
import Header from '../Header/Header';
import ProgressBar from '../ProgressBar/ProgressBar';
import TasksAndCategories from '../TasksAndCategories/TasksAndCategories'
class App extends Component {
  render() {    
    return (
        <div>
          <Header/>
          <ProgressBar/>
          <TasksAndCategories
            categories={this.props.categories}
            tasks={this.props.tasks}/>
        </div>
    );
  }
}

export default App;
