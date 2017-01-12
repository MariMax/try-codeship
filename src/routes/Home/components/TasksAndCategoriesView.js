import React, { Component, PropTypes } from 'react'

import CategoriesList from 'components/CategoriesList/CategoriesList';
import TasksList from 'components/TasksList/TasksList';
import UndoRedo from 'components/UndoRedo/UndoRedo';
import InputForm from 'components/InputForm/InputForm';
import InputModal from 'components/InputModal/InputModal';

class TasksAndCategoriesView extends Component {
    constructor() {
        super();
        this.state = {};
    }

    resetState(){
        this.setState({
            addSubCategoryFor:null,
            editedCategory:null
        });
    }

    onRemoveCategoryClick(category) {
        if(confirm(`Do you really want remove category "${category.title}"?`)){
            this.props.onRemoveCategory(category);
        }
    }

    onAddSubCategoryClick(parentCategory) {
        this.resetState();
        this.setState({
            addSubCategoryFor: parentCategory
        });
    }

    onSubmitAddSubCategory(title){
        this.props.onAddCategory(title, this.state.addSubCategoryFor);
        this.resetState();
    }

    onEditCategoryClick(category) {
        this.resetState();
        this.setState({
            editedCategory: category
        });
    }

    onSubmitEditCategory(title){
        this.props.onUpdateCategory(title, this.state.editedCategory);
        this.resetState();
    }

    render() {
        return (
                <div className={this.props.className}>
                    <UndoRedo className="m-b-1"/>
                    <div className="clearfix m-b-1">
                        <div className="pull-xs-left">
                            <InputForm onSubmit={this.props.onAddCategory} placeholder="Enter category title"/>
                        </div>
                        {
                            this.props.showAddTaskForm ?
                                (<div className="pull-xs-right">
                                    <InputForm onSubmit={this.props.onAddTask} placeholder="Enter new task title"/>
                                </div>) : null
                        }
                    </div>
                    <div className="row">
                        <div className="col-xs-4">
                            <CategoriesList
                                className="list-group pre-scrollable categories-list"
                                onEdit={this.onEditCategoryClick.bind(this)}
                                onAddSubCategory={this.onAddSubCategoryClick.bind(this)}
                                onSelect={this.props.onSelectCategory}
                                onRemove={this.onRemoveCategoryClick.bind(this)}
                                list={this.props.categoriesTree}/>
                        </div>
                        <div className="col-xs-8">
                            <TasksList onDoneChange={this.props.onTaskDoneChanged} list={this.props.tasks}/>
                        </div>
                    </div>
                    {this.state.addSubCategoryFor?(
                        <InputModal onSubmit={this.onSubmitAddSubCategory.bind(this)} modalTitle={`Add sub category for "${this.state.addSubCategoryFor.title}"`} placeholder="Enter category name" onHide={this.onHideModal}/>
                    ):null}
                    {this.state.editedCategory?(
                        <InputModal value={this.state.editedCategory.title} onSubmit={this.onSubmitEditCategory.bind(this)} modalTitle={`Edit category "${this.state.editedCategory.title}"`} placeholder="Enter new category name" onHide={this.onHideModal}/>
                    ):null}
                </div>
        );
    }
}

TasksAndCategoriesView.propTypes = {
    categoriesTree: PropTypes.array.isRequired,
    tasks: PropTypes.array.isRequired,
    onTaskDoneChanged:PropTypes.func.isRequired,
    onAddCategory:PropTypes.func.isRequired,
    onUpdateCategory:PropTypes.func.isRequired,
    onRemoveCategory:PropTypes.func.isRequired,
    onAddTask:PropTypes.func,
    showAddTaskForm:PropTypes.bool
};

export default TasksAndCategoriesView;
