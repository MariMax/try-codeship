// CategoriesList
import React, { PropTypes } from 'react';
import CategoryItem from './components/CategoryItem/CategoryItem';

function CategoriesList(props){
    return (
      <ul className="list-group pre-scrollable categories-list">
        {props.list.map((category) =>
          <CategoryItem
            key={category.id}
            category={category}
            onEdit={props.onEdit} 
            onAddSubCategory={props.onAddSubCategory}/>)}
      </ul>
    );
}

CategoriesList.propTypes = {
  list : PropTypes.array.isRequired,
  onAddSubCategory: PropTypes.func,
  onEdit: PropTypes.func
}

export default CategoriesList;
