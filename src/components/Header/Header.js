import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <header className="navbar navbar-static-top navbar-dark bg-inverse">
        <div className="container">
        <h3 className="text-white float-xs-left">To-Do List</h3>
        <form className="form-inline float-xs-right">
          <label className="text-white"><input className="form-control" type="checkbox"/> Show active</label>
          <input type="text" className="form-control m-l-1" placeholder="Search..."/>
        </form>
        </div>
      </header>
    );
  }
}

export default Header;
