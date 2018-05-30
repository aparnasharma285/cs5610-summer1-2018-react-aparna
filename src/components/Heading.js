import React from 'react'
import {connect} from "react-redux";
import * as actions from "../actions/index";

const Heading = ({widget, changeHeadingSize, widgetTextChanged, widgetNameChanged, preview, editWidgetId}) => {
    let selectElem
    let inputElement
    let inputName
    return (
        <div>
            <div className='wbdv-widegt-form' style={{display: (preview && editWidgetId != widget.id) ? 'none' : 'block'}}>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Heading Text</label>
                    <div className="col-sm-10">
                        <input placeholder='Heading Text' className="form-control"
                               onChange={() => widgetTextChanged(widget.id, inputElement.value)}
                               value={widget.text}
                               ref={node => inputElement = node}/>
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Heading Size</label>
                    <div className="col-sm-10">
                        <select className="form-control"
                                onChange={e => (changeHeadingSize(widget.id, selectElem.value))}
                                value={widget.size}
                                ref={node => selectElem = node}>
                            <option value="1">Heading 1</option>
                            <option value="2">Heading 2</option>
                            <option value="3">Heading 3</option>
                        </select>
                    </div>
                </div>


                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Widget Name</label>
                    <div className="col-sm-10">
                        <input className="form-control" placeholder='Widget name'
                               onChange={() => widgetNameChanged(widget.id, inputName.value)}
                               value={widget.name}
                               ref={node => inputName = node}/>&nbsp;
                    </div>
                </div>
                <h3><b>Preview</b></h3>

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
    widgetNameChanged: (widgetId, newName) => actions.widgetNameChanged(dispatch, widgetId, newName)
})
const stateToPropsMapper = state => ({
    preview: state.preview,
    editWidgetId:state.editWidgetId
})

export const HeadingContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(Heading)