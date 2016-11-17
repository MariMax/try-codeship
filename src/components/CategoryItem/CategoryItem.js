// CategoryItem
import React, { Component } from 'react';

class CategoryItem extends Component {
  render() {
    return (
        <li className="list-group-item">{this.props.category.title}</li>
    );
  }
}

export default CategoryItem;
