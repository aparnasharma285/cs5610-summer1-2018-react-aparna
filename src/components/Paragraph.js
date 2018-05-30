import React from 'react'
import {connect} from "react-redux";
import * as actions from "../actions/index";


const Paragraph = ({widget, widgetTextChanged, widgetNameChanged, preview, editWidgetId}) => {
    let inputElement
    let inputName
    return (
        <div>
            <div className='wbdv-widget-form' style={{display: (preview && editWidgetId != widget.id) ? 'none' : 'block'}}>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Paragraph Text</label>
                    <div className="col-sm-10">
                <textarea placeholder='Paragraph Text' className="form-control"
                          onChange={() => widgetTextChanged(widget.id, inputElement.value)}
                          value={widget.text}
                          ref={node => inputElement = node}/></div>
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
                <p>{widget.text}</p>
            </div>
        </div>)

}

const dispatchToPropsMapper = dispatch => ({
    widgetTextChanged: (widgetId, newText) => actions.widgetTextChanged(dispatch, widgetId, newText),
    widgetMoveDown: (widget) => actions.widgetMoveDown(dispatch, widget),
    widgetNameChanged: (widgetId, newName) => actions.widgetNameChanged(dispatch, widgetId, newName)

})


const stateToPropsMapper = state => ({
    preview: state.preview,
    editWidgetId:state.editWidgetId
})

export const ParagraphContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(Paragraph)


