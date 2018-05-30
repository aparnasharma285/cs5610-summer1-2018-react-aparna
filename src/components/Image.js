import React from 'react'
import {connect} from "react-redux";
import * as actions from "../actions/index";

const Image = ({widget, imageUrlChanged, widgetNameChanged, preview}) => {
    let inputElement
    let inputName
    return (
        <div>
            <div className='wbdv-widget-form' style={{display: preview ? 'none' : 'block'}}>
                <h1>Image Widget</h1>
                <input className="form-control" onChange={() => imageUrlChanged(widget.id, inputElement.value)}
                       value={widget.src}
                       ref={node => inputElement = node}/>

                <input className="form-control" placeholder='Widget name' onChange={() => widgetNameChanged(widget.id, inputName.value)}
                       value={widget.name}
                       ref={node => inputName = node}/>

                <h3>Preview</h3>
            </div>
            <div className='wbdv-widget-preview'>
                <img src={widget.src} alt='Widget Image'/>
            </div>
        </div>
    )
}

const dispatchToPropsMapper = dispatch => ({
    imageUrlChanged: (widegtId, newUrl) => actions.imageUrlChanged(dispatch, widegtId, newUrl),
    widgetMoveDown: (widget) => actions.widgetMoveDown(dispatch, widget),
    widgetNameChanged: (widgetId, newName) => actions.widgetNameChanged(dispatch,widgetId,newName)
})
const stateToPropsMapper = state => ({
    preview: state.preview
})

export const ImageContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(Image)