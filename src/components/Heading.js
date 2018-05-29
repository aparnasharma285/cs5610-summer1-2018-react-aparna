import React from 'react'
import {connect} from "react-redux";
import * as actions from "../actions/index";

const Heading = ({widget, changeHeadingSize,headingTextChanged}) => {
    let selectElem
    let inputElement
    return (
        <div>
            <div>
                <h1> Heading Widget</h1>

                <input onChange={() => headingTextChanged(widget.id, inputElement.value)}
                       value={widget.text}
                       ref={node => inputElement = node}/>

                <select onChange={e => (changeHeadingSize(widget.id, selectElem.value))}
                        value={widget.size}
                        ref={node => selectElem = node}>
                    <option value="1">Heading 1</option>
                    <option value="2">Heading 2</option>
                    <option value="3">Heading 3</option>
                </select>
            </div>
            <h3>Preview</h3>
            {widget.size == 1 && <h1>{widget.text}</h1>}
            {widget.size == 2 && <h2>{widget.text}</h2>}
            {widget.size == 3 && <h3>{widget.text}</h3>}
        </div>
    )
}

const dispatchToPropsMapper = dispatch => ({
    changeHeadingSize: (widgetId, newSize) => actions.changeHeadingSize(dispatch, widgetId, newSize),
    headingTextChanged: (widgetId, newText) => actions.headingTextChanged(dispatch,widgetId,newText)

})
const stateToPropsMapper = state => ({
    preview: state.preview
})

export const HeadingContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(Heading)