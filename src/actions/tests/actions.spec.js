import { ACTION_ADD_CATEGORY, addCategoryAction } from '../addCategoryAction';
import { ACTION_UPDATE_CATEGORY, updateCategoryAction } from '../updateCategoryAction';
import { ACTION_REMOVE_CATEGORY, removeCategoryAction } from '../removeCategoryAction';

import { ACTION_ADD_TASK, addTaskAction } from '../addTaskAction';
import { ACTION_UPDATE_TASK, updateTaskAction } from '../updateTaskAction';

import { ACTION_SET_TASKS_AND_CATEGORIES, setTasksAndCategoriesAction } from '../setTasksAndCategoriesAction';

describe('Category actions', function(){

    describe('addCategoryAction', function(){
        it('should create right action object', function() {
            expect(addCategoryAction('category title', 'parent')).toEqual({
                type: ACTION_ADD_CATEGORY,
                title: 'category title',
                parent: 'parent'
            });
        });
    });

    describe('updateCategoryAction', function(){
        it('should create action object with right parameters', function() {
            expect(updateCategoryAction('new title', 'category')).toEqual({
                type: ACTION_UPDATE_CATEGORY,
                title: 'new title',
                category: 'category'
            });
        });
    });

    describe('removeCategoryAction', function(){
        it('should create action object with right parameters', function() {
            expect(removeCategoryAction({
                getAllIds:()=>'all ids'
            })).toEqual({
                type: ACTION_REMOVE_CATEGORY,
                categoriesIds: 'all ids'
            });
        });
    });
});

describe('Tasks actions', function(){

    describe('addTaskAction', function(){
        it('should create action object with right parameters', function(){
            expect(addTaskAction('newTaskTitle', 'category')).toEqual({
                type: ACTION_ADD_TASK,
                title: 'newTaskTitle',
                category: 'category'
            });
        });
    });

    describe('updateTaskAction', function(){
        it('should create action object with right parameters', function(){
            expect(updateTaskAction('task', 'updates')).toEqual({
                type: ACTION_UPDATE_TASK,
                task: 'task',
                updates: 'updates'
            });
        });
    });

});

describe('Other actions', function(){
    describe('setTasksAndCategoriesAction', function(){
        it('should create action object with right parameters', function(){
            expect(setTasksAndCategoriesAction('tasks list', 'categories list')).toEqual({
                type: ACTION_SET_TASKS_AND_CATEGORIES,
                tasks: 'tasks list',
                categories: 'categories list'
            });
        });
    });
});