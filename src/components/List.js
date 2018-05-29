import React from 'react'
import {connect} from "react-redux";
import * as actions from "../actions/index";


const List = ({widget, listTextChanged, changeListType,preview}) => {
    let inputText
    let listType
    let list = widget.text.split('\n');
    var listItems = list.map((item) => {
        return (<li>{item}</li>)
    })

    return (
        <div>
            <div className='wbdv-widget-form' style={{display: preview ? 'none' : 'block'}}>
                <h1>List Widget</h1>
                <textarea type='text' onChange={() => listTextChanged(widget.id, inputText.value)}
                          value={widget.text}
                          ref={node => inputText = node}/>

                <select onChange={e => (changeListType(widget.id, listType.value))}
                        value={widget.listType}
                        ref={node => listType = node}>
                    <option value="ORDERED">Ordered List</option>
                    <option value="UNORDERED">Unordered List</option>
                </select>

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
    listTextChanged: (widgetId, newText) => actions.listTextChanged(dispatch, widgetId, newText),
    changeListType: (widgetId, newListType) => actions.changeListType(dispatch, widgetId, newListType)

})
const stateToPropsMapper = state => ({
    preview: state.preview
})

export const ListContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(List)