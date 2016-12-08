import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <header className="navbar navbar-static-top navbar-dark bg-inverse">
        <div className="container">
        <h3 className="text-white pull-xs-left">{this.props.title}</h3>
        {(this.props.showTaskFilter?
          (<form className="form-inline pull-xs-right">
            <label className="text-white"><input className="form-control" type="checkbox"/> Show active</label>
            <input type="text" className="form-control m-l-1" placeholder="Search..."/>
          </form>)
          :null
        )}
        </div>
      </header>
    );
  }
}

export default Header;
