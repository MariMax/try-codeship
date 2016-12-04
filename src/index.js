import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

import AppContainer from 'containers/AppContainer/AppContainer';

import PageTasksList from 'pages/PageTasksList/PageTasksList';
import PageEditTask from 'pages/PageEditTask/PageEditTask';

import 'bootstrap/dist/css/bootstrap-flex.css';
import './index.css';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from 'reducers';

import { loadCategoriesList, loadTasksList } from 'data-providers/tasks/tasks';
import { setCategoriesListAction } from 'actions/setCategoriesListAction';
import { setTasksListAction } from 'actions/setTasksListAction';

var initialState = {
  categories: [],
  tasks: []
};

var store = createStore(reducers, initialState);

function loadCategories(){
  loadCategoriesList().then(categoiresList => {
    store.dispatch(setCategoriesListAction(categoiresList));
  });
}

function loadTasks(){
  loadTasksList().then(tasksList => {
    store.dispatch(setTasksListAction(tasksList));
  });
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path='/' component={AppContainer}>
          <IndexRoute component={PageTasksList} />
          <Route path='edit' component={PageEditTask} />
      </Route>
    </Router>
</Provider>,
  document.getElementById('root')
);


loadCategories();
loadTasks();
