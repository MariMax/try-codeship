// PageEditTask
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from 'components/Header/Header';
import CategoriesList from 'components/CategoriesList/CategoriesList';
import CategoriesTree from 'utils/categories-tree';
import { updateTaskAction } from 'actions/updateTaskAction';

class PageEditTask extends Component {
  constructor() {
    super();
    this.state = {
      categoryId:null,
      isDone:false
    };
  }

  componentWillReceiveProps(newProps) {
    let task = newProps.task;
    if(task){
      this.categoriesTree = new CategoriesTree(newProps.categories);
      this.refs.tasktitle.value = task.title || '';
      this.refs.description.value = task.description || '';
      this.setState({
        category:this.categoriesTree.getCategory(task.categoryId),
        isDone: !!task.done
      });
    }
  }

  handleSubmit(e){
    e.preventDefault();
    this.saveTask();
    this.props.router.goBack();
  }

  saveTask() {
    this.props.updateTaskAction(this.props.task, {
      title: this.refs.tasktitle.value,
      description: this.refs.description.value,
      category: this.state.category,
      done: this.state.isDone
    });
  }

  onSelectCategory(cat) {
    this.setState({
      category:cat
    });
  }

  onDoneChanged(e){
    this.setState({
      isDone:e.target.checked
    });
  }

  render() {
    let categoriesTree = [];
    if(this.categoriesTree){
      this.categoriesTree.selectBranch(this.state.category);
      categoriesTree = this.categoriesTree.getTree();
    }


    return (
        <div>
          <Header title="To-Do Item #1" showTaskFilter={false}/>
          <div className="container">
            <div className="row m-t-1">
              <div className="col-xs-4">
                <CategoriesList
                    className="list-group pre-scrollable categories-list"
                    onSelect={this.onSelectCategory.bind(this)}
                    list={categoriesTree}/>
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
                      <input className="form-check-input"
                        type="checkbox"
                        onChange={this.onDoneChanged.bind(this)}
                        checked={this.state.isDone}/> &nbsp; Done
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
  return {
    task: state.tasks.find(function(task){
      return taskId === task.id;
    }),
    categories:state.categories
  };
}
export default connect(mapStateToProps, {updateTaskAction:updateTaskAction})(PageEditTask);
