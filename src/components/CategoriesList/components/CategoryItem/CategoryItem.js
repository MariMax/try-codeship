// CategoryItem
import React, { Component, PropTypes } from 'react';
import CategoriesList from '../../CategoriesList';
import SVGUse from 'components/SVGUse/SVGUse';

class CategoryItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subListOpened: false
    };
    this.toggleSubBntClick = this.toggleList.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
    this.wrapHandler = this.wrapHandler.bind(this);
  }

  toggleList(e){
    e.stopPropagation();
    this.setState({
      subListOpened:!this.state.subListOpened
    });
  }
  onClickHandler(e){
    e.stopPropagation();
    if(this.props.onSelect){
        this.props.onSelect(this.props.category);
    }
  }

  wrapHandler(handler){
      var cat = this.props.category;
      return function (e) {
          e.stopPropagation();
          handler(cat);
      }
  }

  render() {
    var cat = this.props.category;
    var hasSub = Array.isArray(cat.subcategories) && cat.subcategories.length;
    var toggleStateIcon = this.state.subListOpened?'#icon-minus':'#icon-plus';
    var isSelected = this.props.isSelected;
    var classes = [];
    this.props.onSelect && classes.push('cursor-pointer');
    classes.push((isSelected?'bg-primary text-white':'text-default'));

    return (
        <li onClick={this.onClickHandler} className={'list-group-item '+classes.join(' ')}>
          {(hasSub)?(
            <button onClick={this.toggleSubBntClick} className="btn btn-sm btn-info m-r-1">
                <SVGUse href={toggleStateIcon}/>
            </button>)
          :null}
          {cat.title}
          {this.props.onAddSubCategory
            ?(<SVGUse onClick={this.wrapHandler(this.props.onAddSubCategory)} className="pull-xs-right icon m-l-025" href="#icon-folder-plus"/>):null}
          {this.props.onEdit
            ?(<SVGUse onClick={this.wrapHandler(this.props.onEdit)} className="pull-xs-right icon m-l-025" href="#icon-pencil"/>):null}

          {this.props.onRemove
            ?(<SVGUse onClick={this.wrapHandler(this.props.onRemove)} className="pull-xs-right icon" href="#icon-bin"></SVGUse>):null}
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
