// CategoryItem
import React, { Component } from 'react';

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
          {(hasSub)?(<button onClick={this.toggleSubBntClick} className="btn btn-sm btn-info m-r-1">+</button>):null}
          {cat.title}
          {(hasSub&&this.state.subListOpened)?(
            <ul className="list-group m-t-1">
              {cat.subcategories.map((elem) => <CategoryItem key={elem.id} category={elem}/>)}
            </ul>):null}
        </li>
    );
  }
}

CategoryItem.propTypes = {
  category : React.PropTypes.object.isRequired
}

export default CategoryItem;
