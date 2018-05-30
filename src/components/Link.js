import React from 'react'
import {connect} from "react-redux";
import * as actions from "../actions/index";

const Link = ({widget, widgetTextChanged, linkUrlChanged, widgetNameChanged, preview, editWidgetId}) => {
    let inputElement
    let inputText
    let inputName
    return (
        <div>
            <div className='wbdv-widget-form' style={{display: (preview && editWidgetId != widget.id) ? 'none' : 'block'}}>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Link Url</label>
                    <div className="col-sm-10">
                        <input placeholder='Link Url' className="form-control"
                               onChange={() => linkUrlChanged(widget.id, inputElement.value)}
                               value={widget.href}
                               ref={node => inputElement = node}/>
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Link Text</label>
                    <div className="col-sm-10">
                        <input placeholder='Link Text' className="form-control"
                               onChange={() => widgetTextChanged(widget.id, inputText.value)}
                               value={widget.text}
                               ref={node => inputText = node}/>
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
                <a href={widget.href} target="_blank" className='wbdv-link-preview'>{widget.text}</a>
            </div>
        </div>


    )
}

const dispatchToPropsMapper = dispatch => ({
    linkUrlChanged: (widegtId, newUrl) => actions.linkUrlChanged(dispatch, widegtId, newUrl),
    widgetTextChanged: (widgetId, newText) => actions.widgetTextChanged(dispatch, widgetId, newText),
    widgetMoveDown: (widget) => actions.widgetMoveDown(dispatch, widget),
    widgetNameChanged: (widgetId, newName) => actions.widgetNameChanged(dispatch, widgetId, newName)
})
const stateToPropsMapper = state => ({
    preview: state.preview,
    editWidgetId:state.editWidgetId
})

export const LinkContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(Link)