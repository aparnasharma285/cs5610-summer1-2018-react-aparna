import React from 'react'
import {connect} from "react-redux";
import * as actions from "../actions/index";


const Paragraph = ({widget, paragraphTextChanged,preview}) => {
    let inputElement
    return (
        <div>
            <div className='wbdv-widget-form' style={{display: preview ? 'none' : 'block'}}>
                <h1>Paragraph Widget</h1>
                <textarea onChange={() => paragraphTextChanged(widget.id, inputElement.value)}
                          value={widget.text}
                          ref={node => inputElement = node}/>

                <h3>Preview</h3>
            </div>
            <div className='wbdv-widget-preview'>
                <p>{widget.text}</p>
            </div>
        </div>)

}

const dispatchToPropsMapper = dispatch => ({
    paragraphTextChanged: (widgetId, newText) => actions.paragraphTextChanged(dispatch, widgetId, newText)

})


const stateToPropsMapper = state => ({
    preview: state.preview
})

export const ParagraphContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(Paragraph)


