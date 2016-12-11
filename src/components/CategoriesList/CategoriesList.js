// CategoriesList
import React, { PropTypes } from 'react';
import CategoryItem from './components/CategoryItem/CategoryItem';

function CategoriesList(props){  
    return (
      <ul className={props.className}>
        {props.list.map((category) =>
          <CategoryItem
            key={category.id}
            category={category}
            isSelected={category.selected}
            onEdit={props.onEdit}
            onSelect={props.onSelect}
            onAddSubCategory={props.onAddSubCategory}/>)}
      </ul>
    );
}

CategoriesList.propTypes = {
  list : PropTypes.array.isRequired,
  onAddSubCategory: PropTypes.func,
  onEdit: PropTypes.func,
  onSelect: PropTypes.func
}

export default CategoriesList;
