import React from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from 'redux-undo';
import SVGUse from 'components/SVGUse/SVGUse';

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
            <button className={"btn" +(!props.hasUndo?' disabled':'')} onClick={props.undoAction}>
                <SVGUse href="#icon-undo"/>
            </button>
            <button className={"btn"+(!props.hasRedo?' disabled':'')} onClick={props.redoAction}>
                <SVGUse href="#icon-redo"/>
            </button>
        </div>
    )
});