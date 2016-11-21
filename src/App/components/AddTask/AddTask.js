import React, { Component } from 'react';


class AddTask extends Component {
  render() {
    return (
        <form className="form-inline">
          <input type="text" className="form-control" placeholder="Enter new task title"/>
          <button type="submit" className="btn btn-success m-l-1">Add</button>
        </form>
    );
  }
}

export default AddTask;
