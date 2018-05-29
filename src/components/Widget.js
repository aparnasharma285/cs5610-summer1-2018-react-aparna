import React from 'react'
import {connect} from "react-redux";
import {DELETE, SELECT_WIDGET_TYPE} from "../constants";
import * as actions from "../actions/WidgetActions";


export const Widget = ({widget, dispatch, deleteWidget, changeWidgetType}) => {
    let selectElement
    return (
        <li key={widget.id}>
            {widget.widgetType}
            <select onChange={e => (changeWidgetType(widget.id, selectElement))}
                    ref={node => selectElement = node}>
                <option>Heading</option>
                <option>Link</option>
                <option>Paragraph</option>
                <option>Image</option>
                <option>List</option>
            </select>
            <button onClick={e => (deleteWidget(widget.id))}>Delete</button>
        </li>
    )
}

const dispatchToPropsMapper = dispatch => ({
    deleteWidget: (widgetId) => actions.deleteWidget(dispatch,widgetId),
    changeWidgetType : (widgetId, selectElement) => actions.changeWidgetType(dispatch,widgetId,selectElement)
})
const stateToPropsMapper = state => ({
    preview: state.preview
})

export const WidgetContainer = connect(stateToPropsMapper,dispatchToPropsMapper)(Widget)


