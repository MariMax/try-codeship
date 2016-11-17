// CategoriesList
import React, { Component } from 'react';
import CategoryItem from '../CategoryItem/CategoryItem';

class CategoriesList extends Component {
  render() {
    return (
      <ul className="list-group pre-scrollable categories-list">      
        {this.props.list.map((elem) => <CategoryItem key={elem.id} category={elem}/>)}
      </ul>
    );
  }
}

export default CategoriesList;
