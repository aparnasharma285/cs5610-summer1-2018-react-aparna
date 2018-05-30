import React from 'react'
import {connect} from "react-redux";
import * as actions from "../actions/index";


const List = ({widget, widgetTextChanged, changeListType, widgetNameChanged, preview}) => {
    let inputText
    let listType
    let inputName
    let list = widget.text.split('\n');
    var listItems = list.map((item) => {
        return (<li>{item}</li>)
    })

    return (
        <div>
            <div className='wbdv-widget-form' style={{display: preview ? 'none' : 'block'}}>
                <h1>List Widget</h1>
                <textarea  className="form-control" type='text' onChange={() => widgetTextChanged(widget.id, inputText.value)}
                          value={widget.text}
                          ref={node => inputText = node}/>

                <select className="form-control" onChange={e => (changeListType(widget.id, listType.value))}
                        value={widget.listType}
                        ref={node => listType = node}>
                    <option value="ORDERED">Ordered List</option>
                    <option value="UNORDERED">Unordered List</option>
                </select>

                <input className="form-control" placeholder='Widget name' onChange={() => widgetNameChanged(widget.id, inputName.value)}
                       value={widget.name}
                       ref={node => inputName = node}/>

                <h3>Preview</h3>
            </div>
            <div className='wbdv-widget-preview'>
                {widget.listType == 'ORDERED' && <ol>{listItems}</ol>}
                {widget.listType !== 'ORDERED' && <ul>{listItems}</ul>}
            </div>
        </div>
    )
}

const dispatchToPropsMapper = dispatch => ({
    widgetTextChanged: (widgetId, newText) => actions.widgetTextChanged(dispatch, widgetId, newText),
    changeListType: (widgetId, newListType) => actions.changeListType(dispatch, widgetId, newListType),
    widgetMoveDown: (widget) => actions.widgetMoveDown(dispatch, widget),
    widgetNameChanged: (widgetId, newName) => actions.widgetNameChanged(dispatch,widgetId,newName)

})
const stateToPropsMapper = state => ({
    preview: state.preview
})

export const ListContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(List)