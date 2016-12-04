import React, { Component } from 'react';
import CategoriesList from '../CategoriesList/CategoriesList';
import { connect } from 'react-redux';

class AllCategoriesList extends Component {
  render(){
    return (<CategoriesList list={this.props.categories}/>)
  }
}


const mapStateToProps = (state) => ({
  categories : state.categories
});


export default connect(mapStateToProps)(AllCategoriesList);
