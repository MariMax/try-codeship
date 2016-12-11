import React, { Component, PropTypes } from 'react';
import CategoriesList from '../CategoriesList/CategoriesList';
import { connect } from 'react-redux';

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
  function selectBranch(cat){
    cat.selected = true;
    if(cat.__parentLink){
      selectBranch(cat.__parentLink);
    }
  }
  function createCategoriesTree(plainList) {
    var categoriesList = [];
    var cache = {};
    plainList.forEach(function(cat){
      cache[cat.id] = Object.assign(cache[cat.id] || {},
                                    {
                                      id: cat.id,
                                      title: cat.title
                                    });
      if(cat.parent){
        cache[cat.parent] = cache[cat.parent] || {};
        cache[cat.id].__parentLink = cache[cat.parent];
        cache[cat.parent].subcategories = cache[cat.parent].subcategories || [];
        cache[cat.parent].subcategories.push(cache[cat.id]);
      }
      else{
        categoriesList.push(cache[cat.id]);
      }
      if(props.selectedCategory && props.selectedCategory.id === cat.id){
        selectBranch(cache[cat.id]);
      }
    });
    return categoriesList;
  }

  return {
    categories: createCategoriesTree(state.categories)
  };
}

AllCategoriesList.propTypes = {
  selectedCategory: PropTypes.object,
  onAddSubCategory: PropTypes.func,
  onEdit: PropTypes.func,
  onSelect: PropTypes.func
}

export default connect(mapStateToProps)(AllCategoriesList);
