import React from 'react'
import {connect} from "react-redux";
import * as actions from "../actions/index";
import {HeadingContainer} from './Heading'

const Link = () => (
    <h1>Link</h1>
)

const Paragraph = () => (
    <h1>Paragraph</h1>
)

const Image = () => (
    <h1>Image</h1>
)

const List = () => (
    <h1>List</h1>
)

export const Widget = ({widget, dispatch, deleteWidget, changeWidgetType}) => {
    let selectElement
    return (
        <div>

            <select value={widget.widgetType} onChange={e => (changeWidgetType(widget.id, selectElement.value))}
                    ref={node => selectElement = node}>
                <option>Heading</option>
                <option>Link</option>
                <option>Paragraph</option>
                <option>Image</option>
                <option>List</option>
            </select>

            <button onClick={e => (deleteWidget(widget.id))}>Delete</button>

            <div>
                {widget.widgetType === 'Heading' && <HeadingContainer widget={widget}/>}
            </div>
        </div>

    )
}

const dispatchToPropsMapper = dispatch => ({
    deleteWidget: (widgetId) => actions.deleteWidget(dispatch, widgetId),
    changeWidgetType: (widgetId, newType) => actions.changeWidgetType(dispatch, widgetId, newType),

})
const stateToPropsMapper = state => ({
    preview: state.preview
})


export const WidgetContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(Widget)


