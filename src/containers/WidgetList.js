import React, {Component} from 'react'
import {createStore} from 'redux'
import {connect} from 'react-redux'

const stateToPropertyMapper = (state) => ({
    widgets: state.widgets
})

const dispatcherToPropsMapper = dispatch => ({
    findAllWidgets: () => findAllWidgets(dispatch),
    addWidget: () => addWidget(dispatch),
    deleteWidget: (id) => deleteWidget(dispatch,id)
})


class WidgetList extends React.Component {
    constructor(props) {
        super(props)
        this.props.findAllWidgets()
    }


    render() {
        return (
            <div>
                <ul>
                    {this.props.widgets.map(widget => (<WidgetContainer key={widget.id} widget={widget} />))}
                </ul>
                <button onClick={this.props.addWidget}>Add</button>
            </div>
        )
    }

}

const Widget = ({widget, deleteWidget}) => (
    <li key={widget.id}>
        {widget.text}
        <button onClick={e => deleteWidget(widget.id)}>Delete</button>
    </li>
)
const WidgetContainer = connect(null, dispatcherToPropsMapper)(Widget)

export const addWidget = dispatch => (
    dispatch({type: 'Add'})
)

const findAllWidgets = dispatch => {
    fetch(('https://cs5610-java-server-aparna.herokuapp.com/api/topic/TID/widget').replace('TID',32))
        .then(response => (response.json()))
        .then(widgets => dispatch({
            type: 'Find',
            widgets: widgets
        }))
}



const deleteWidget = (dispatch,id) => (
    dispatch({type : 'Delete', id:id})
)

const initialState = {
    widgets: [
        {id: 1, text: 'widget 1'},
        {id: 2, text: 'widget 2'},
        {id: 3, text: 'widget 3'}
    ]
}

let idCounter = 4
const widgetReducer = (state = {widgets: []}, action) => {
    switch (action.type) {
        case 'Add':
            return {
                widgets: [
                    ...state.widgets,
                    {
                        id: state.widgets.length + 1,
                        text: 'New Widget',
                        widgetType: 'Paragraph',
                        size: '2'
                    }
                ]
            }
        case 'Delete':
            return {
                widgets: state.widgets.filter(widget => (
                    widget.id !== action.id
                ))
            }
        case 'Find':
            return {
                widgets: action.widgets
            }
        default:
            return initialState
    }
}


export let store = createStore(widgetReducer)

const App = connect(stateToPropertyMapper, dispatcherToPropsMapper)(WidgetList)

export default App