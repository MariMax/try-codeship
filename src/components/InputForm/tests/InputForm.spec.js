import React from 'react';
import ReactDOM from 'react-dom';

import InputForm from '../InputForm'

describe('InputForm component', function(){

    it('renders without crashing', function(){
        const div = document.createElement('div');
        ReactDOM.render(<InputForm />, div);
    });

});