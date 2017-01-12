// TaskContainer

import React, { Component } from 'react';
import { connect } from 'react-redux';


import updateTaskAction from 'actions/updateTaskAction';

import Header from 'components/Header/Header';
import EditTaskView from '../components/EditTaskView'

class TaskContainer extends Component {
    onSaveTask(task, updates){
        this.props.updateTaskAction(task, updates);
        this.props.goBack();
    }

    render(){
        return (
            <div>
                <Header title={this.props.task.title} showTaskFilter={false}/>
                <EditTaskView className="container"
                              categories={this.props.categories}
                              task={this.props.task}
                              onSave={this.onSaveTask.bind(this)}
                              onCancel={this.props.goBack}/>
            </div>
        );
    }
}

function mapStateToProps(state, props){
    let curState = state.present;
    let taskId = parseInt(props.routeParams.taskId, 10);
    return {
        task: curState.tasks.find(function(task){
            return taskId === task.id;
        }),
        categories:curState.categories,
        goBack: props.router.goBack
    };
}

export default connect(mapStateToProps, { updateTaskAction:updateTaskAction })(TaskContainer);

