// PageTasksList
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from 'components/Header/Header';
import ProgressBar from 'components/ProgressBar/ProgressBar';
import TasksAndCategories from 'components/TasksAndCategories/TasksAndCategories';
import _ from 'lodash';

class PageTasksList extends Component {

  constructor() {
    super();
    this.state = {
      category:null
    }
    this.onSelectCategory = this.onSelectCategory.bind(this);
    this.onChangeFilterHandler = this.onChangeFilterHandler.bind(this);
  }

  updateFilters(filterData) {
    this.props.router.push({
      query: _(Object.assign(this.props.filters, filterData))
        .omitBy(function(val){
          return !val;          
        }).value()
    });
  }

  onChangeFilterHandler(filterData) {
    this.updateFilters(filterData);
  }

  onSelectCategory(category) {
    var filterCategory = this.props.filters.category;
    var newCat = !filterCategory || filterCategory !== category.id ? category : null;
    this.updateFilters({
      category: newCat && newCat.id
    });
  }
  render() {
    return (
        <div>
          <Header
            title="To-Do List"
            filters={this.props.filters}
            showTaskFilter={true}
            onChangeFilter={this.onChangeFilterHandler}/>
          <ProgressBar/>
          <TasksAndCategories
            filters={this.props.filters}
            onSelectCategory={this.onSelectCategory}/>
        </div>
    );
  }
}

function mapStateToProps(state, props){
  return {
    filters: props.location.query
  }
}

export default connect(mapStateToProps)(PageTasksList);


// router.push({
//   pathname: '/users/12',
//   query: { modal: true },
//   state: { fromDashboard: true }
// })
