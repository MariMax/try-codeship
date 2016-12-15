import React, { Component, PropTypes } from 'react';
import { IndexLink } from 'react-router'
import FilterForm from './components/FilterForm/FilterForm';

class Header extends Component {


  render() {
    return (
      <header className="navbar navbar-static-top navbar-dark bg-inverse">
        <div className="container">
        <h3 className="text-white pull-xs-left">
          <IndexLink className="text-white" to="/">{this.props.title}</IndexLink>
        </h3>
        {(this.props.showTaskFilter?
          (<FilterForm
            className="form-inline pull-xs-right"
            filters={this.props.filters}
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
  filters: PropTypes.object
}

export default Header;
