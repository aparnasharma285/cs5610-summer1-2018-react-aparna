import React, {Component} from 'react'
import {createStore} from 'redux'
import {connect} from 'react-redux'

const stateToPropertyMapper = (state,topicProps) => ({
    widgets: state.widgets,
    topicId:topicProps.topicId
})

const dispatcherToPropsMapper = dispatch => ({
    findAllWidgets: () => findAllWidgets(dispatch),
    addWidget: () => addWidget(dispatch),
    deleteWidget: (id) => deleteWidget(dispatch,id),
    saveWidget:() => saveWidget(dispatch)
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
                <button onClick={this.props.saveWidget}>Save</button>
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

export const saveWidget = dispatch => (
    dispatch({type: 'Save'})
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
                        widgetType: 'Heading',
                        size: '1'
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

        case 'Save':
            fetch(('https://cs5610-java-server-aparna.herokuapp.com/api/widget/save/TID').replace('TID',32), {
                method: 'post',
                body: JSON.stringify(state.widgets),
                headers: {
                    'content-type': 'application/json'}
            })
        default:
            return state
    }
}


export let store = createStore(widgetReducer)

const App = connect(stateToPropertyMapper, dispatcherToPropsMapper)(WidgetList)

export default App