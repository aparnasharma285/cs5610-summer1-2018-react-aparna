import React from 'react'
import {connect} from "react-redux";
import * as actions from "../actions/index";

const Heading = ({widget, changeHeadingSize}) => {
    let selectElem
    return (
        <div>
            <h1> Heading </h1>
            <select onChange={e => (changeHeadingSize(widget.id, selectElem.value))}
                    value={widget.size}
                    ref={node => selectElem = node}>
                <option value="1">Heading 1</option>
                <option value="2">Heading 2</option>
                <option value="3">Heading 3</option>
            </select>
        </div>)
}

const dispatchToPropsMapper = dispatch => ({
    changeHeadingSize:(widgetId, newSize) => actions.changeHeadingSize(dispatch,widgetId,newSize)

})
const stateToPropsMapper = state => ({
    preview: state.preview
})

export const HeadingContainer = connect(stateToPropsMapper,dispatchToPropsMapper)(Heading)