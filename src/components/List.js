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

                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">List Items</label>
                    <div className="col-sm-10">
                <textarea placeholder='List Text' className="form-control" type='text'
                          onChange={() => widgetTextChanged(widget.id, inputText.value)}
                          value={widget.text}
                          ref={node => inputText = node}/>
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">List Type</label>
                    <div className="col-sm-10">
                        <select className="form-control" onChange={e => (changeListType(widget.id, listType.value))}
                                value={widget.listType}
                                ref={node => listType = node}>
                            <option value="ORDERED">Ordered List</option>
                            <option value="UNORDERED">Unordered List</option>
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
    widgetNameChanged: (widgetId, newName) => actions.widgetNameChanged(dispatch, widgetId, newName)

})
const stateToPropsMapper = state => ({
    preview: state.preview
})

export const ListContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(List)