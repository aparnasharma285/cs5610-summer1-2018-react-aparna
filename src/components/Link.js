import React from 'react'
import {connect} from "react-redux";
import * as actions from "../actions/index";

const Link = ({widget,linkTextChanged,linkUrlChanged,preview}) => {
    let inputElement
    let inputText
    return(
        <div>
            <div className='wbdv-widget-form' style={{display: preview ? 'none' : 'block'}}>
            <h1>Link Widget</h1>
            <input onChange={() => linkUrlChanged(widget.id, inputElement.value)}
                   value={widget.href}
                   ref={node => inputElement = node}/>

            <input onChange={() => linkTextChanged(widget.id, inputText.value)}
                   value={widget.text}
                   ref={node => inputText = node}/>

            <h3>Preview</h3>
            </div>
            <div className='wbdv-widget-preview'>
            <a href={widget.href} target="_blank">{widget.text}</a>
            </div>
        </div>


    )
}

const dispatchToPropsMapper = dispatch => ({
    linkUrlChanged : (widegtId, newUrl) => actions.linkUrlChanged(dispatch,widegtId,newUrl),
    linkTextChanged: (widgetId, newText) => actions.linkTextChanged(dispatch,widgetId,newText)
})
const stateToPropsMapper = state => ({
    preview: state.preview
})

export const LinkContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(Link)