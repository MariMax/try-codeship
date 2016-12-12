// PageEditTask
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from 'components/Header/Header';
import AllCategoriesList from 'components/AllCategoriesList/AllCategoriesList';
import { updateTaskAction } from 'actions/updateTaskAction';

class PageEditTask extends Component {
  constructor() {
    super();
    this.state = {
      category:null
    };
  }

  componentWillReceiveProps(newProps) {
    if(newProps.task){
      this.refs.tasktitle.value = newProps.task.title || '';
      this.refs.description.value = newProps.task.description || '';
      if(newProps.category){
        this.setState({
          category:newProps.category
        });
      }
    }
  }

  handleSubmit(e){
    e.preventDefault();
    this.saveTask();
    this.props.router.goBack();
  }

  saveTask() {
    this.props.updateTaskAction(
    this.props.task,
    this.refs.tasktitle.value,
    this.refs.description.value,
    this.state.category);
  }

  onSelectCategory(cat) {
    this.setState({
      category:cat
    });
  }

  render() {
    return (
        <div>
          <Header title="To-Do Item #1" showTaskFilter={false}/>
          <div className="container">
            <div className="row m-t-1">
              <div className="col-xs-4">
                <AllCategoriesList selectedCategory={this.state.category} onSelect={this.onSelectCategory.bind(this)}/>
              </div>
              <div className="col-xs-8">
               <form onSubmit={this.handleSubmit.bind(this)}>
                  <div className="pull-xs-right m-b-1">
                    <button type="button" onClick={this.props.router.goBack} className="btn btn-secondary">Cancel</button>
                    <button type="submit" className="btn btn-success m-l-1">Save changes</button>
                  </div>
                  <div className="form-group">
                    <input ref="tasktitle" type="text" className="form-control" placeholder="Task title"/>
                  </div>
                  <div className="form-check">
                    <label className="form-check-label">
                      <input className="form-check-input" type="checkbox" value=""/> &nbsp; Active
                    </label>
                  </div>
                  <div className="form-group">
                    <textarea ref="description" className="form-control" rows="10"></textarea>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
    );
  }
}
function mapStateToProps(state, props){
  let taskId = parseInt(props.routeParams.taskId, 10);
  let task = state.tasks.find(function(task){
    return taskId === task.id;
  });
  let category;

  if(task){
    category = state.categories.find(function(cat){
      return task.categoryId === cat.id;
    });
  }

  return {
    task: task,
    category:category
  };
}
export default connect(mapStateToProps, {updateTaskAction:updateTaskAction})(PageEditTask);
