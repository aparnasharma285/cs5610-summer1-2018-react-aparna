import React from 'react'
import {connect} from "react-redux";
import * as actions from "../actions/index";


const Paragraph = ({widget,paragraphTextChanged}) => {
    let inputElement
    return(
    <div>
        <h1>Paragraph Widget</h1>
        <textarea onChange={() => paragraphTextChanged(widget.id, inputElement.value)}
               value={widget.text}
               ref={node => inputElement = node}/>

        <h3>Preview</h3>
        <p>{widget.text}</p>
    </div>)

}

const dispatchToPropsMapper = dispatch => ({
    paragraphTextChanged: (widgetId, newText) => actions.paragraphTextChanged(dispatch,widgetId,newText)

})


const stateToPropsMapper = state => ({
    preview: state.preview
})

export const ParagraphContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(Paragraph)


