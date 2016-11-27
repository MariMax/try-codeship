// CategoriesList
import React from 'react';
import CategoryItem from './components/CategoryItem/CategoryItem';

function CategoriesList(props){
    return (
      <ul className="list-group pre-scrollable categories-list">
        {props.list.map((category) => <CategoryItem key={category.id} category={category}/>)}
      </ul>
    );
}

CategoriesList.propTypes = {
  list : React.PropTypes.array.isRequired
}

export default CategoriesList;
