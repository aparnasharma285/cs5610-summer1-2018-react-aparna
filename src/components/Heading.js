import React from 'react'
import {connect} from "react-redux";
import * as actions from "../actions/index";

const Heading = ({widget, changeHeadingSize, widgetTextChanged, widgetNameChanged, preview}) => {
    let selectElem
    let inputElement
    let inputName
    return (
        <div>
            <div className='wbdv-widegt-form' style={{display: preview ? 'none' : 'block'}}>
                <input className="form-control" onChange={() => widgetTextChanged(widget.id, inputElement.value)}
                       value={widget.text}
                       ref={node => inputElement = node}/>

                <select className="form-control" onChange={e => (changeHeadingSize(widget.id, selectElem.value))}
                        value={widget.size}
                        ref={node => selectElem = node}>
                    <option value="1">Heading 1</option>
                    <option value="2">Heading 2</option>
                    <option value="3">Heading 3</option>
                </select>

                <input  className="form-control" placeholder='Widget name' onChange={() => widgetNameChanged(widget.id, inputName.value)}
                       value={widget.name}
                       ref={node => inputName = node}/>

                <h3>Preview</h3>

            </div>
            <div className='wbdv-widget-preview'>
                {widget.size == 1 && <h1>{widget.text}</h1>}
                {widget.size == 2 && <h2>{widget.text}</h2>}
                {widget.size == 3 && <h3>{widget.text}</h3>}
            </div>
        </div>
    )
}

const dispatchToPropsMapper = dispatch => ({
    changeHeadingSize: (widgetId, newSize) => actions.changeHeadingSize(dispatch, widgetId, newSize),
    widgetTextChanged: (widgetId, newText) => actions.widgetTextChanged(dispatch, widgetId, newText),
    widgetNameChanged: (widgetId, newName) => actions.widgetNameChanged(dispatch,widgetId,newName)
})
const stateToPropsMapper = state => ({
    preview: state.preview
})

export const HeadingContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(Heading)