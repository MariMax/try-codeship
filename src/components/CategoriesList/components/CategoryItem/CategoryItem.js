// CategoryItem
import React, { Component, PropTypes } from 'react';

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

    return (
        <li className="list-group-item">
          {(hasSub)?(
            <button onClick={this.toggleSubBntClick} className="btn btn-sm btn-info m-r-1">
              {this.state.subListOpened?'-':'+'}
            </button>)
          :null}
          {cat.title}
          {this.props.onAddSubCategory
            ?(<button onClick={()=>this.props.onAddSubCategory(cat)} className="pull-xs-right">add</button>):null}
          {this.props.onEdit
            ?(<button onClick={()=>this.props.onEdit(cat)} className="pull-xs-right">edit</button>):null}
          {(hasSub&&this.state.subListOpened)?(
            <ul className="list-group m-t-1">
              {cat.subcategories.map((elem) =>
                <CategoryItem
                  key={elem.id}
                  category={elem}
                  onEdit={this.props.onEdit} 
                  onAddSubCategory={this.props.onAddSubCategory}/>)}
            </ul>):null}
        </li>
    );
  }
}

CategoryItem.propTypes = {
  category : PropTypes.object.isRequired,
  onAddSubCategory: PropTypes.func,
  onEdit: PropTypes.func
}

export default CategoryItem;
