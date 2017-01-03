import React from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from 'redux-undo';

function mapStateToProps(state){
    return {
        hasUndo: !!state.past.length,
        hasRedo: !!state.future.length
    }
}

export default connect(mapStateToProps, {
    undoAction: ActionCreators.undo,
    redoAction: ActionCreators.redo
})(function UndoRedo(props){
    return (
        <div className={props.className}>
            <button className={"btn fa fa-undo" +(!props.hasUndo?' disabled':'')} onClick={props.undoAction}></button>
            <button className={"btn fa fa fa-repeat"+(!props.hasRedo?' disabled':'')} onClick={props.redoAction}></button>
        </div>
    )
});