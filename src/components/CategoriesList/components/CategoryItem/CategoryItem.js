// CategoryItem
import React, { Component, PropTypes } from 'react';
import CategoriesList from '../../CategoriesList';

class CategoryItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subListOpened: false
    };
    this.toggleSubBntClick = this.toggleList.bind(this);
  }

  toggleList(){
    this.setState({
      subListOpened:!this.state.subListOpened
    });
  }

  render() {
    var cat = this.props.category;
    var hasSub = Array.isArray(cat.subcategories) && cat.subcategories.length;
    var toggleStateIcon = this.state.subListOpened?'fa-minus-square':'fa-plus-square';
    var isSelected = this.props.isSelected;

    return (
        <li className={'list-group-item '+(isSelected?'bg-primary text-white':'text-default')}>
          {(hasSub)?(
            <button onClick={this.toggleSubBntClick} className={`btn btn-sm btn-info m-r-1 fa ${toggleStateIcon}`}>
            </button>)
          :null}
          {cat.title}
          {this.props.onAddSubCategory
            ?(<button onClick={()=>this.props.onAddSubCategory(cat)} className="pull-xs-right fa fa-plus-circle"></button>):null}
          {this.props.onEdit
            ?(<button onClick={()=>this.props.onEdit(cat)} className="pull-xs-right fa fa-edit"></button>):null}
          {this.props.onSelect
            ?(<button onClick={()=>this.props.onSelect(cat)} className="pull-xs-right fa fa-check-circle"></button>):null}
          {this.props.onRemove
            ?(<button onClick={()=>this.props.onRemove(cat)} className="pull-xs-right fa fa-trash"></button>):null}
          {(hasSub&&this.state.subListOpened)?(
            <CategoriesList
              className="list-group m-t-1"
              onEdit={this.props.onEdit}
              onSelect={this.props.onSelect}
              onRemove={this.props.onRemove}
              onAddSubCategory={this.props.onAddSubCategory}
              list={cat.subcategories}/>):null}
        </li>
    );
  }
}

CategoryItem.propTypes = {
  category : PropTypes.object.isRequired,
  isSelected: PropTypes.bool,
  onAddSubCategory: PropTypes.func,
  onEdit: PropTypes.func,
  onSelect: PropTypes.func,
  onRemove: PropTypes.func
};

export default CategoryItem;
