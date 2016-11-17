import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import 'bootstrap/dist/css/bootstrap-flex.css';
//import 'bootstrap/dist/css/bootstrap-theme.css';
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
    title: "Category 4"
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

ReactDOM.render(
  <App categories={categoriesList} tasks={tasksList}/>,
  document.getElementById('root')
);
