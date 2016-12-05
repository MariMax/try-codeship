import React, { Component } from 'react';
import CategoriesList from '../CategoriesList/CategoriesList';
import { connect } from 'react-redux';

class AllCategoriesList extends Component {
  render(){
    return (<CategoriesList list={this.props.categories}/>)
  }
}


function mapStateToProps(state) {
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
        cache[cat.parent].subcategories = cache[cat.parent].subcategories || [];
        cache[cat.parent].subcategories.push(cache[cat.id]);
      }
      else{
        categoriesList.push(cache[cat.id]);
      }
    });
    return categoriesList;
  }

  return {
    categories: createCategoriesTree(state.categories)
  };
}


export default connect(mapStateToProps)(AllCategoriesList);
