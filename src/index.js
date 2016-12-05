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
import { setTasksAndCategoriesAction } from 'actions/setTasksAndCategoriesAction';


var initialState = {
  categories: [],
  tasks: []
};

var store = createStore(reducers, initialState);

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

// initail loading state
Promise.all([
  loadTasksList(),
  loadCategoriesList()
]).then(function(result){
  store.dispatch(setTasksAndCategoriesAction(...result));
});
