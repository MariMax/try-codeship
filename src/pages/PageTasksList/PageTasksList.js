// PageTasksList
import React, { Component } from 'react';

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
  }

  onSelectCategory(category) {
    var filterCategory = this.props.location.query.category;
    var newCat = !filterCategory || filterCategory !== category.id ? category : null;  
    if(!newCat){
      this.props.router.push({
        query: {}
      });
    }
    else{
      this.props.router.push({
        query: {
          category: newCat && newCat.id
        }
      });
    }
  }
  render() {
    return (
        <div>
          <Header title="To-Do List" showTaskFilter={true}/>
          <ProgressBar/>
          <TasksAndCategories
            filters={this.props.location.query}
            onSelectCategory={this.onSelectCategory}/>
        </div>
    );
  }
}

export default PageTasksList;


// router.push({
//   pathname: '/users/12',
//   query: { modal: true },
//   state: { fromDashboard: true }
// })
