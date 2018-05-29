import React from 'react'
import {connect} from "react-redux";
import * as actions from "../actions/index";

const Image = ({widget, imageUrlChanged,preview}) => {
    let inputElement
    return (
        <div>
            <div className='wbdv-widget-form' style={{display: preview ? 'none' : 'block'}}>
                <h1>Image Widget</h1>
                <input onChange={() => imageUrlChanged(widget.id, inputElement.value)}
                       value={widget.src}
                       ref={node => inputElement = node}/>

                <h3>Preview</h3>
            </div>
            <div className='wbdv-widget-preview'>
                <img src={widget.src} alt='Widget Image'/>
            </div>
        </div>
    )
}

const dispatchToPropsMapper = dispatch => ({
    imageUrlChanged: (widegtId, newUrl) => actions.imageUrlChanged(dispatch, widegtId, newUrl)
})
const stateToPropsMapper = state => ({
    preview: state.preview
})

export const ImageContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(Image)