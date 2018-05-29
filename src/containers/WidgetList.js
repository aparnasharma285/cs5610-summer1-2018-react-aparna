import React, {Component} from 'react'
import {createStore} from 'redux'
import {connect} from 'react-redux'
import {widgetReducer} from "../reducers/WidgetReducer";
import {WidgetContainer} from "../components/Widget";
import {addWidget, saveWidget, findAllWidgets, assignTopicId} from "../actions/WidgetActions";

class WidgetList extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillReceiveProps(newProps) {
        if (newProps.topicIdFromTopic != newProps.topicId) {
            newProps.assignTopicId(newProps.topicIdFromTopic);

        }

    }

    render() {
        return (
            <div>
                <ul>
                    {this.props.widgets.map(widget => (<WidgetContainer key={widget.id} widget={widget}/>))}
                </ul>
                <button onClick={this.props.addWidget}>Add</button>
                <button onClick={this.props.saveWidget}>Save</button>
            </div>
        )
    }
}

export let store = createStore(widgetReducer)

const stateToPropertyMapper = (state, topicProps) => ({
    widgets: state.widgets,
    topicId: state.topicId,
    topicIdFromTopic: topicProps.topicId
})

export const dispatcherToPropsMapper = (dispatch, topicId) => ({
    assignTopicId: (topicId) => assignTopicId(dispatch, topicId),
    findAllWidgets: (topicId) => findAllWidgets(dispatch, topicId),
    addWidget: () => addWidget(dispatch),
    saveWidget: () => saveWidget(dispatch)
})



const App = connect(stateToPropertyMapper, dispatcherToPropsMapper)(WidgetList)

export default App