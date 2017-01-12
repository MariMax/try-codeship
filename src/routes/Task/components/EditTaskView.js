// EditTaskView
import React, { Component, PropTypes } from 'react';

import CategoriesTree from 'utils/categories-tree';

import CategoriesList from 'components/CategoriesList/CategoriesList';

class EditTaskView extends Component {
    constructor({ categories, task } ) {
        super();

        this.categoriesTree = new CategoriesTree(categories);
        this.state = {
            title: task.title,
            description: task.description,
            category:this.categoriesTree.getCategory(task.categoryId),
            done: !!task.done
        };
    }

    onSelectCategory(cat) {
        this.setState({
            category:cat
        });
    }

    onDoneChanged(e){
        this.setState({
            done:e.target.checked
        });
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.onSave(this.props.task, this.state);
    }

    createInputHandler(statePropName){
        return function(e){
            var partialState = {};
            partialState[statePropName] = e.target.value;
            this.setState(partialState);
        }.bind(this);
    }

    render() {
        let categoriesTree = [];
        if(this.categoriesTree){
            this.categoriesTree.selectBranch(this.state.category);
            categoriesTree = this.categoriesTree.getTree();
        }
        return (
            <div className={this.props.className}>
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
                                <button type="button" onClick={this.props.onCancel} className="btn btn-secondary">Cancel</button>
                                <button type="submit" className="btn btn-success m-l-1">Save changes</button>
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Task title" value={this.state.title} onChange={this.createInputHandler.call(this, 'title')}/>
                            </div>
                            <div className="form-check">
                                <label className="form-check-label">
                                    <input className="form-check-input"
                                           type="checkbox"
                                           onChange={this.onDoneChanged.bind(this)}
                                           checked={this.state.done}/> &nbsp; Done
                                </label>
                            </div>
                            <div className="form-group">
                                <textarea value={this.state.description} onChange={this.createInputHandler.call(this, 'description')} className="form-control" rows="10"></textarea>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

EditTaskView.propTypes = {
    categories: PropTypes.array.isRequired,
    task: PropTypes.object.isRequired,
    onCancel:PropTypes.func.isRequired,
    onSave:PropTypes.func.isRequired
};

export default EditTaskView;