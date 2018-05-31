import React from 'react'
import {connect} from "react-redux";
import * as actions from "../actions/index";
import {HeadingContainer} from './Heading'
import {ParagraphContainer} from './Paragraph'
import {ImageContainer} from './Image'
import {LinkContainer} from './Link'
import {ListContainer} from './List'

export const Widget = ({widget, widgets, widgetsCount, dispatch, deleteWidget, changeWidgetType, widgetMoveUp, widgetMoveDown, preview, widgetEdit, editWidgetId, widgetEditDone}) => {
    let selectElement
    let totalCount = widgetsCount
    let widgetIndex = widgets.indexOf(widget)
    let hideuparrow = false
    let hidedownarrow = false
    if (widgetIndex == 0) {
        hideuparrow = true
    }

    if (widgetIndex == (totalCount - 1)) {
        hidedownarrow = true
    }
    return (
        <div className='card col bg-light mb-3 wbdv-widget'>

            <div className='card-header' style={{display: (preview && editWidgetId != widget.id) ? 'none' : 'block'}}>

                <h3 style={{display: 'inline'}}>
                    {widget.widgetType} Widget
                </h3>
                <div className='wbdv-widget-edit-panel form-inline'>

                    <button hidden={editWidgetId != widget.id || !preview}className='btn btn-success wbdv-widget-edit-done-btn' onClick={() => {
                        widgetEditDone(widget.id)
                    }}><i className='fa fa-check'></i>&nbsp;Done</button>
                    &nbsp;

                    <button hidden={hideuparrow} className='btn btn-primary wbdv-widget-up-btn' onClick={() => {
                        widgetMoveUp(widget)
                    }}><i className='fa fa-arrow-up'></i></button>
                    &nbsp;
                    <button hidden={hidedownarrow} className='btn btn-primary wbdv-widget-down-btn' onClick={() => {
                        widgetMoveDown(widget)
                    }}><i className='fa fa-arrow-down'></i></button>
                    &nbsp;
                    <select className="form-control wbdv-widget-types" value={widget.widgetType}
                            onChange={e => (changeWidgetType(widget.id, selectElement.value))}
                            ref={node => selectElement = node}>
                        <option>Heading</option>
                        <option>Link</option>
                        <option>Paragraph</option>
                        <option>Image</option>
                        <option>List</option>
                    </select> &nbsp;
                    <button className='btn btn-danger wbdv-widget-delete-btn' onClick={e => (deleteWidget(widget.id))}>
                        <i className='fa fa-times'></i>
                    </button>
                </div>
            </div>


            <div className='card-body'>
                <button hidden={!preview || editWidgetId == widget.id} className='btn btn-success wbdv-widget-edit-btn' onClick={() => {
                    widgetEdit(widget.id)
                }}><i className='fa fa-pencil'></i></button>
                &nbsp;
                {widget.widgetType === 'Heading' && <HeadingContainer widget={widget}/>}
                {widget.widgetType === 'Paragraph' && <ParagraphContainer widget={widget}/>}
                {widget.widgetType === 'Image' && <ImageContainer widget={widget}/>}
                {widget.widgetType === 'Link' && <LinkContainer widget={widget}/>}
                {widget.widgetType === 'List' && <ListContainer widget={widget}/>}
            </div>
        </div>)
}

const dispatchToPropsMapper = dispatch => ({
    deleteWidget: (widgetId) => actions.deleteWidget(dispatch, widgetId),
    changeWidgetType: (widgetId, newType) => actions.changeWidgetType(dispatch, widgetId, newType),
    widgetMoveUp: (widget) => actions.widgetMoveUp(dispatch, widget),
    widgetMoveDown: (widget) => actions.widgetMoveDown(dispatch, widget),
    widgetEdit: (widgetId) => actions.widgetEdit(dispatch, widgetId),
    widgetEditDone : (widgetId) => actions.widgetEditDone(dispatch, widgetId)
})
const stateToPropsMapper = (state) => ({
    widgets: state.widgets,
    widgetsCount: state.widgets.length,
    preview: state.preview,
    editWidgetId: state.editWidgetId
})


export const WidgetContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(Widget)


