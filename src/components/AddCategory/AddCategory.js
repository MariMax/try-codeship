import React, { Component } from 'react';


class AddCategory extends Component {
  render() {
    return (
        <form className="form-inline">
          <input type="text" className="form-control" placeholder="Enter category title"/>
          <button type="submit" className="btn btn-success m-l-1">Add</button>
        </form>
    );
  }
}

export default AddCategory;
