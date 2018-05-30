import React from 'react'
import {connect} from "react-redux";
import * as actions from "../actions/index";

const Link = ({widget,widgetTextChanged,linkUrlChanged, widgetNameChanged, preview}) => {
    let inputElement
    let inputText
    let inputName
    return(
        <div>
            <div className='wbdv-widget-form' style={{display: preview ? 'none' : 'block'}}>
            <h1>Link Widget</h1>
            <input className="form-control" onChange={() => linkUrlChanged(widget.id, inputElement.value)}
                   value={widget.href}
                   ref={node => inputElement = node}/>

            <input className="form-control" onChange={() => widgetTextChanged(widget.id, inputText.value)}
                   value={widget.text}
                   ref={node => inputText = node}/>

                <input className="form-control" placeholder='Widget name' onChange={() => widgetNameChanged(widget.id, inputName.value)}
                       value={widget.name}
                       ref={node => inputName = node}/>

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
    widgetTextChanged: (widgetId, newText) => actions.widgetTextChanged(dispatch,widgetId,newText),
    widgetMoveDown: (widget) => actions.widgetMoveDown(dispatch, widget),
    widgetNameChanged: (widgetId, newName) => actions.widgetNameChanged(dispatch,widgetId,newName)
})
const stateToPropsMapper = state => ({
    preview: state.preview
})

export const LinkContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(Link)