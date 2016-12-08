import React, { Component } from 'react';
import InputForm from '../InputForm/InputForm';

import AllCategoriesList from '../AllCategoriesList/AllCategoriesList';
import TasksList from '../TasksList/TasksList';
import { connect } from 'react-redux';

import { addCategoryAction } from 'actions/addCategoryAction';
import { addTaskAction } from 'actions/addTaskAction';
// import $ from 'jquery'

class TasksAndCategories extends Component {
  constructor() {
    super();
    this.onAddCategory = this.onAddCategory.bind(this);
    this.onAddTask = this.onAddTask.bind(this);
  }

  onAddCategory(title) {
    this.props.addCategoryAction(title);
  }

  onAddTask(title) {
    this.props.addTaskAction(title);
  }

  render() {
    return (
        <div className="container">
          <div className="clearfix m-b-1">
            <div className="pull-xs-left">
              <InputForm onSubmit={this.onAddCategory} placeholder="Enter category title"/>
            </div>
            <div className="pull-xs-right">
              <InputForm onSubmit={this.onAddTask} placeholder="Enter new task title"/>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-4">
              <AllCategoriesList/>
            </div>
            <div className="col-xs-8">
              <TasksList list={this.props.tasks}/>
            </div>
          </div>
          <CategoryModal/>
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tasks : state.tasks
});

export default connect(mapStateToProps, { addCategoryAction,  addTaskAction})(TasksAndCategories);

class CategoryModal extends Component {
  componentDidMount() {
      $(this.refs.modal).modal('show');
      $(this.refs.modal).on('hidden.bs.modal', this.props.handleHideModal);
  }

  constructor() {
    super();
    this.state = {
      inputValue:''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({inputValue: event.target.value});
  }

  handleSubmit(e){
      if(this.state.inputValue) {
        // this.props.onSubmit(this.state.inputValue);
        $(this.refs.modal).modal('hide');
      }
      this.setState({inputValue:''});
      e.preventDefault();
  }

  render() {
    return (
    <div ref="modal" className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <h4 className="modal-title" id="myModalLabel">Modal title</h4>
          </div>
          <form onSubmit={this.handleSubmit}>
            <div className="modal-body">
                <input required type="text" value={this.state.inputValue} onChange={this.handleChange} className="form-control" placeholder={this.props.placeholder}/>

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="submit" className="btn btn-primary m-l-1">Save changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>);
  }
}
