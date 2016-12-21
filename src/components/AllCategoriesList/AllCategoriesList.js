import React, { Component, PropTypes } from 'react';
import CategoriesList from '../CategoriesList/CategoriesList';
import { connect } from 'react-redux';
import CategoriesTree from 'utils/categories-tree'

class AllCategoriesList extends Component {
  render(){
    return (
      <CategoriesList
        className="list-group pre-scrollable categories-list"
        selectedCategory={this.props.selectedCategory}
        onEdit={this.props.onEdit}
        onAddSubCategory={this.props.onAddSubCategory}
        onSelect={this.props.onSelect}
        list={this.props.categories}/>)
  }
}

function mapStateToProps(state, props) {
  let categoriesTree = new CategoriesTree(state.categories);
  if(props.selectedCategory) categoriesTree.selectBranch(props.selectedCategory);
  if(props.excludedCategories) categoriesTree.safeRemoveCategories(props.excludedCategories);

  
  return {
    categories: categoriesTree.getTree()
  };
}

AllCategoriesList.propTypes = {
  excludedCategories : PropTypes.array,
  selectedCategory: PropTypes.object,
  onAddSubCategory: PropTypes.func,
  onEdit: PropTypes.func,
  onSelect: PropTypes.func
}

export default connect(mapStateToProps)(AllCategoriesList);
