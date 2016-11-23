import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

import AppContainer from 'containers/AppContainer/AppContainer';

import PageTasksList from 'pages/PageTasksList/PageTasksList';
import PageEditTask from 'pages/PageEditTask/PageEditTask';

import 'bootstrap/dist/css/bootstrap-flex.css';
import './index.css';

var categoriesList = [
  {
    id: 'cat1',
    title: "Category 1"
  },
  {
    id: 'cat2',
    title: "Category 2"
  },
  {
    id: 'cat3',
    title: "Category 3"
  },
  {
    id: 'cat4',
    title: "Category 4",
    subcategories:[{
      id:'cat4-1',
      title: 'Category 4-1'
    }, {
      id:'cat4-2',
      title: 'Category 4-2'
    }]
  },
  {
    id: 'cat5',
    title: "Category 5"
  }
];

var tasksList = [
  {
    id: 1,
    title: "Task 1"
  },
  {
    id: 2,
    title: "Task 2"
  },
  {
    id: 3,
    title: "Task 3"
  },
  {
    id: 4,
    title: "Task 4"
  },
  {
    id: 5,
    title: "Task 5"
  },
  {
    id: 6,
    title: "Task 5"
  },
  {
    id: 7,
    title: "Task 5"
  }
];

class PageTasksListWrapper extends Component {
  render(){
    return <PageTasksList categories={categoriesList} tasks={tasksList}/>
  }
}
class PageEditTaskWrapper extends Component {
  render(){
    return <PageEditTask categories={categoriesList}/>
  }
}

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path='/' component={AppContainer}>
        <IndexRoute component={PageTasksListWrapper} />
        <Route path='edit' component={PageEditTaskWrapper} />
    </Route>
  </Router>,
  document.getElementById('root')
);

// <App categories={categoriesList} tasks={tasksList}/>
/*
<IndexRoute component={Home} />
<Route path='admin' component={Admin} />
<Route path='genre' component={Genre} />
*/
