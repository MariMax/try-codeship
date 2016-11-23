// CategoriesList
import React, { Component } from 'react';
import CategoryItem from './components/CategoryItem/CategoryItem';

import { loadCategoriesList } from 'data-providers/tasks/tasks';

class CategoriesList extends Component {
  constructor(){
    super();
    this.state = {
      list:[]
    };
    this.loadCategories();
  }

  loadCategories(){
    loadCategoriesList().then(categoiresList => {
      this.setState({
          list:categoiresList
        });
    });
  }

  render() {
    return (
      <ul className="list-group pre-scrollable categories-list">
        {this.state.list.map((elem) => <CategoryItem key={elem.id} category={elem}/>)}
      </ul>
    );
  }
}

export default CategoriesList;
