import 'jquery';

import React from 'react';
import ReactDOM from 'react-dom';
import { hashHistory } from 'react-router'
import { createStore } from 'redux';

import AppContainer from 'containers/AppContainer/AppContainer';
import reducers from 'reducers';

import { loadCategoriesList, loadTasksList } from 'data-providers/tasks/tasks';
import { setTasksAndCategoriesAction } from 'actions/setTasksAndCategoriesAction';
import createRoutes from 'routes';

const MOUNT_NODE = document.getElementById('root');

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

let render = () => {
    const routes = createRoutes(store);

    ReactDOM.render(
        <AppContainer store={store} routes={routes} history={hashHistory}/>,
        MOUNT_NODE
    )
};


// GO!
render();
// initail loading state
Promise.all([
  loadTasksList(),
  loadCategoriesList()
]).then(function(result){
  store.dispatch(setTasksAndCategoriesAction(...result));
});
