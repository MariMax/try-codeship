import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

import AppContainer from 'containers/AppContainer/AppContainer';

import PageTasksList from 'pages/PageTasksList/PageTasksList';
import PageEditTask from 'pages/PageEditTask/PageEditTask';

import 'bootstrap/dist/css/bootstrap-flex.css';
import './index.css';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path='/' component={AppContainer}>
        <IndexRoute component={PageTasksList} />
        <Route path='edit' component={PageEditTask} />
    </Route>
  </Router>,
  document.getElementById('root')
);
