// PageEditTask
import React, { Component } from 'react';

import Header from 'components/Header/Header';
import CategoriesList from 'components/CategoriesList/CategoriesList';
import { loadCategoriesList } from 'data-providers/tasks/tasks';

class PageEditTask extends Component {

  constructor(){
    super();
    this.state = {
      categoiresList:[]
    };
    this.loadCategories();
  }

  loadCategories(){
    loadCategoriesList().then(categoiresList => {
      this.setState({
          categoiresList:categoiresList
        });
    });
  }

  render() {
    return (
        <div>
          <Header title="To-Do Item #1" showTaskFilter={false}/>
          <div className="container">
            <div className="row m-t-1">
              <div className="col-xs-4">
                <CategoriesList list={this.state.categoiresList}/>
              </div>
              <div className="col-xs-8">
               <form>
                  <div className="float-xs-right m-b-1">
                    <button type="button" className="btn btn-secondary">Cancel</button>
                    <button type="button" className="btn btn-success m-l-1">Save changes</button>
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="Task title"/>
                  </div>
                  <div className="form-check">
                    <label className="form-check-label">
                      <input className="form-check-input" type="checkbox" value=""/> &nbsp; Active
                    </label>
                  </div>
                  <div className="form-group">
                    <textarea className="form-control" rows="10"></textarea>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default PageEditTask;
