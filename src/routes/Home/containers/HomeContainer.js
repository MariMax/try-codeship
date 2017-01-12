import { connect } from 'react-redux'
import _ from 'lodash';
import React, { Component } from 'react';

import Header from 'components/Header/Header';
import ProgressBar from 'components/ProgressBar/ProgressBar';
import TasksAndCategoriesView from '../components/TasksAndCategoriesView'

import CategoriesTree, { CategoryStatus } from 'utils/categories-tree';

import { addTaskAction } from 'actions/addTaskAction';
import { updateTaskAction } from 'actions/updateTaskAction';
import { addCategoryAction } from 'actions/addCategoryAction';
import { updateCategoryAction } from 'actions/updateCategoryAction';
import { removeCategoryAction } from 'actions/removeCategoryAction';

class HomeContainer extends Component {
    onTaskDoneChanged(task, isDone){
        this.props.updateTaskAction(task, { done: isDone} );
    }

    onAddTask(title){
        this.props.addTaskAction(title, this.props.selectedCategory);
    }

    render() {
        return (
            <div>
                <Header
                    title="To-Do List"
                    filters={this.props.filters}
                    showTaskFilter={true}
                    onChangeFilter={this.props.onChangeFilter}/>
                <ProgressBar/>
                <TasksAndCategoriesView
                    className="container"
                    categoriesTree={this.props.categoriesTree}
                    onSelectCategory={this.props.onSelectCategory}
                    onTaskDoneChanged={this.onTaskDoneChanged.bind(this)}
                    tasks={this.props.tasks}
                    onAddCategory={this.props.addCategoryAction}
                    onUpdateCategory={this.props.updateCategoryAction}
                    onRemoveCategory={this.props.removeCategoryAction}
                    showAddTaskForm={!!this.props.selectedCategory}
                    onAddTask={this.onAddTask.bind(this)}
                />
            </div>
        )
    }
}

function mapStateToProps (state, props){
    const filters = props.location.query;
    const updateFilters = function(filterData) {
        props.router.push({
            query: _(Object.assign(filters, filterData))
                .omitBy(function(val){
                    return !val;
                }).value()
        });
    };

    let curState = state.present;
    let tasks = curState.tasks;
    let categoriesTree = new CategoriesTree(curState.categories);
    let isDone = !!filters.is_done;

    if(filters.query){
        var titleFilter = new RegExp(filters.query, 'i');
        categoriesTree.addTasks(tasks.filter(task => !!task.done === isDone && titleFilter.test(task.title)));
        categoriesTree.getList().forEach(function(cat){
            cat.hidden = !cat.tasks.length;
        });
    }
    else{
        categoriesTree.addTasks(tasks);
        categoriesTree.getList().forEach(function(cat){
            cat.hidden = cat.hidden || cat.isStatus((isDone ? CategoryStatus.UNCOMPLETED : CategoryStatus.COMPLETED));
        });
    }

    let selectedCategory;
    if(filters.category){
        selectedCategory = categoriesTree.getCategory(filters.category);
        selectedCategory = selectedCategory && !selectedCategory.hidden ? selectedCategory:null;
        categoriesTree.selectBranch(selectedCategory);
    }

    return {
        onChangeFilter: updateFilters,
        filters: filters,
        categoriesTree: categoriesTree.getTree(),
        selectedCategory:selectedCategory,
        tasks : selectedCategory?selectedCategory.tasks.filter(task => !!task.done === isDone):[],
        onSelectCategory: function(category){
            let filterCategory = filters.category;
            let newCat = !filterCategory || filterCategory !== category.id ? category : null;
            updateFilters({
                category: newCat && newCat.id
            });
        }
    };
}


const mapDispatchToProps = { updateTaskAction, addCategoryAction, addTaskAction, removeCategoryAction, updateCategoryAction };

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)