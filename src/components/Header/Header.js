import React, { Component, PropTypes } from 'react';
import FilterForm from './components/FilterForm/FilterForm';

class Header extends Component {


  render() {
    return (
      <header className="navbar navbar-static-top navbar-dark bg-inverse">
        <div className="container">
        <h3 className="text-white pull-xs-left">{this.props.title}</h3>
        {(this.props.showTaskFilter?
          (<FilterForm
            className="form-inline pull-xs-right"
            query={this.props.filterQuery}
            onChange={this.props.onChangeFilter} />)
          :null
        )}
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  showTaskFilter : PropTypes.bool,
  onChangeFilter : PropTypes.func,
  filterQuery: PropTypes.string
}

export default Header;
