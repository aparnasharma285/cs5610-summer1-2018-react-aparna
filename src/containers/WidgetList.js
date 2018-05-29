import React, {Component} from 'react'
import {createStore} from 'redux'
import {connect} from 'react-redux'

const widgetReducer = (state = {widgets: [], topicId:0}, action) => {
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
                ],
                topicId: state.topicId
            }
        case 'Delete':
            return {
                widgets: state.widgets.filter(widget => (
                    widget.id !== action.id
                )),

                topicId: state.topicId
            }
        case 'Find':
            return {
                widgets: action.widgets,
                topicId: state.topicId
            }

        case 'Save':
            fetch(('https://cs5610-java-server-aparna.herokuapp.com/api/widget/save/TID').replace('TID',state.topicId), {
                method: 'post',
                body: JSON.stringify(state.widgets),
                headers: {
                    'content-type': 'application/json'}
            })
            return state
        case 'AssignTopicId':
            return {
                widgets: action.widgets,
                topicId: action.topicId
            }
        default:
            return state
    }
}

export let store = createStore(widgetReducer)


const stateToPropertyMapper = (state,topicProps) => ({
    widgets: state.widgets,
    topicId: state.topicId,
    topicIdFromTopic:topicProps.topicId
})

const dispatcherToPropsMapper = (dispatch,topicId) => ({
    assignTopicId: (topicId) => assignTopicId(dispatch,topicId),
    findAllWidgets: (topicId) => findAllWidgets(dispatch, topicId),
    addWidget: () => addWidget(dispatch),
    deleteWidget: (id) => deleteWidget(dispatch,id),
    saveWidget:() => saveWidget(dispatch)
})


class WidgetList extends React.Component {
    constructor(props) {
        super(props)


    }

    componentWillReceiveProps(newProps) {
        if(newProps.topicIdFromTopic != newProps.topicId) {
            newProps.assignTopicId(newProps.topicIdFromTopic);

        }

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
const App = connect(stateToPropertyMapper, dispatcherToPropsMapper)(WidgetList)



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

export const assignTopicId = (dispatch,topicId) => (
    fetch(('https://cs5610-java-server-aparna.herokuapp.com/api/topic/TID/widget').replace('TID',topicId))
        .then(response => (response.json()))
        .then(widgets => dispatch({
            type: 'AssignTopicId',
            widgets: widgets,
            topicId:topicId
        }))
)


const findAllWidgets = (dispatch, topicId) => {
    fetch(('https://cs5610-java-server-aparna.herokuapp.com/api/topic/TID/widget').replace('TID',topicId))
        .then(response => (response.json()))
        .then(widgets => dispatch({
            type: 'Find',
            widgets: widgets
        }))
}



const deleteWidget = (dispatch,id) => (
    dispatch({type : 'Delete', id:id})
)


export default App