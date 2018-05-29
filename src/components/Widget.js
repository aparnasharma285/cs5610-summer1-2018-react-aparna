import React from 'react'
import {connect} from "react-redux";
import * as actions from "../actions/index";
import {HeadingContainer} from './Heading'
import {ParagraphContainer} from './Paragraph'
import {ImageContainer} from './Image'
import {LinkContainer} from './Link'
import {ListContainer} from './List'

export const Widget = ({widget, dispatch, deleteWidget, changeWidgetType, widgetMoveUp, widgetMoveDown, preview}) => {
    let selectElement
    return (
        <div className='card bg-light mb-3 wbdv-widget'>

            <div className='card-header'  style={{display: preview ? 'none': 'block'}}> <h2>{widget.widgetType} Widget</h2>

                <select value={widget.widgetType} onChange={e => (changeWidgetType(widget.id, selectElement.value))}
                        ref={node => selectElement = node}>
                    <option>Heading</option>
                    <option>Link</option>
                    <option>Paragraph</option>
                    <option>Image</option>
                    <option>List</option>
                </select>

                <button className='btn btn-danger wbdv-widget-delete-btn' onClick={e => (deleteWidget(widget.id))}>
                    <i className='fa fa-times'></i>
                </button>

                <button className='btn btn-warning wbdv-widget-up-btn' onClick={() => {
                    widgetMoveUp(widget)
                }}><i className='fa fa-arrow-up'></i></button>
                <button className='btn btn-warning wbdv-widget-down-btn' onClick={() => {
                    widgetMoveDown(widget)
                }}><i className='fa fa-arrow-down'></i></button>
            </div>

            <div className='card-body'>
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
    widgetMoveDown: (widget) => actions.widgetMoveDown(dispatch, widget)

})
const stateToPropsMapper = (state) => ({
    preview: state.preview
})


export const WidgetContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(Widget)


