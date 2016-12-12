// PageTasksList
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from 'components/Header/Header';
import ProgressBar from 'components/ProgressBar/ProgressBar';
import TasksAndCategories from 'components/TasksAndCategories/TasksAndCategories'

class PageTasksList extends Component {

  constructor() {
    super();
    this.state = {
      category:null
    }
    this.onSelectCategory = this.onSelectCategory.bind(this);
    this.onChangeFilter = this.onChangeFilter.bind(this);
  }

  onChangeFilter(filterData){
    var query = filterData.query;
    if(query.length){
      this.props.router.push({
        query: Object.assign(this.props.filters, {
          query: query
        })
      });
    }
    else if(this.props.filters.query){
      delete this.props.filters.query;
      this.props.router.push({
        query:this.props.filters
      });
    }
  }

  onSelectCategory(category) {
    var filterCategory = this.props.filters.category;
    var newCat = !filterCategory || filterCategory !== category.id ? category : null;
    if(!newCat){
      delete this.props.filters.category;
      this.props.router.push({
        query: this.props.filters
      });
    }
    else {
      this.props.router.push({
        query: Object.assign(this.props.filters, {
          category: newCat && newCat.id
        })
      });
    }
  }
  render() {
    return (
        <div>
          <Header
            title="To-Do List"
            showTaskFilter={true}
            onChangeFilter={this.onChangeFilter}/>
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
