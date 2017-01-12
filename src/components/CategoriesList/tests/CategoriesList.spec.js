import React from 'react';
import renderer from 'react-test-renderer'

import CategoriesList from '../CategoriesList'

var categoriesListMock = [
    {
        id: 'cat1',
        title: "Category 1"
    },
    {
        id: 'cat2',
        title: "Category 2"
    },
    {
        id: 'cat3',
        title: "Category 3"
    },
    {
        id: 'cat4',
        title: "Category 4"
    },
    {
        id:'cat4-1',
        title: 'Category 4-1',
        parent: 'cat4'
    },
    {
        id:'cat4-1-1',
        title: 'Category 4-1-1',
        parent: 'cat4-1'
    }, {
        id:'cat4-1-2',
        title: 'Category 4-1-2',
        parent: 'cat4-1'
    },
    {
        id:'cat4-2',
        title: 'Category 4-2',
        parent: 'cat4'
    },
    {
        id: 'cat5',
        title: "Category 5"
    }
];


describe('CategoriesList component', function(){
    jest.mock('../../SVGUse/SVGUse', function(){
        return (<button/>);
    });

    it('should render categories list', function(){
        var noop = function(){};
        const component = renderer.create(
            <CategoriesList
                list={categoriesListMock}
                onAddSubCategory={noop}
                onEdit={noop}
                onSelect={noop}
                onRemove={noop}/>
        );

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

});