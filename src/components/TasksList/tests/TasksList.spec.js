import React from 'react';
import renderer from 'react-test-renderer'

import TasksList from '../TasksList'
var tasksListMock = [
    {
        id: 1,
        title: 'task 1',
        done: false
    },
    {
        id: 2,
        title: 'task 2',
        done: true
    },
    {
        id: 3,
        title: 'task 3',
        done: true
    }
];

describe('TasksList component', function(){

    it('should render tasks list', function(){
        const component = renderer.create(
            <TasksList list={tasksListMock} onDoneChange={function(){}}/>
        );

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

});