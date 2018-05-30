import React from 'react'
import {connect} from "react-redux";
import * as actions from "../actions/index";


const Paragraph = ({widget, widgetTextChanged, widgetNameChanged, preview}) => {
    let inputElement
    let inputName
    return (
        <div>
            <div className='wbdv-widget-form' style={{display: preview ? 'none' : 'block'}}>
                <h1>Paragraph Widget</h1>
                <textarea className="form-control" onChange={() => widgetTextChanged(widget.id, inputElement.value)}
                          value={widget.text}
                          ref={node => inputElement = node}/>

                <input className="form-control" placeholder='Widget name' onChange={() => widgetNameChanged(widget.id, inputName.value)}
                       value={widget.name}
                       ref={node => inputName = node}/>

                <h3>Preview</h3>
            </div>
            <div className='wbdv-widget-preview'>
                <p>{widget.text}</p>
            </div>
        </div>)

}

const dispatchToPropsMapper = dispatch => ({
    widgetTextChanged: (widgetId, newText) => actions.widgetTextChanged(dispatch, widgetId, newText),
    widgetMoveDown: (widget) => actions.widgetMoveDown(dispatch, widget),
    widgetNameChanged: (widgetId, newName) => actions.widgetNameChanged(dispatch,widgetId,newName)

})


const stateToPropsMapper = state => ({
    preview: state.preview
})

export const ParagraphContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(Paragraph)


