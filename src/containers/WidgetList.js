import React, {Component} from 'react'
import {createStore} from 'redux'
import {connect} from 'react-redux'
import {widgetReducer} from "../reducers/WidgetReducer";
import {WidgetContainer} from "../components/Widget";
import * as actions from "../actions/index";

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
                <button hidden={this.props.preview} onClick={this.props.saveWidget}>Save</button>
                <button onClick={this.props.previewWidget}>Preview</button> <br/>
                {this.props.widgets.map(widget => (<WidgetContainer key={widget.id} widget={widget}/>))}
                <button onClick={this.props.addWidget}>Add</button>

            </div>
        )
    }
}

export let store = createStore(widgetReducer)

const stateToPropertyMapper = (state, topicProps) => ({
    widgets: state.widgets,
    topicId: state.topicId,
    preview: state.preview,
    topicIdFromTopic: topicProps.topicId
})

export const dispatcherToPropsMapper = (dispatch, topicId) => ({
    assignTopicId: (topicId) => actions.assignTopicId(dispatch, topicId),
    findAllWidgets: (topicId) => actions.findAllWidgets(dispatch, topicId),
    addWidget: () => actions.addWidget(dispatch),
    saveWidget: () => actions.saveWidget(dispatch),
    previewWidget: () => actions.previewWidget(dispatch)
})


const App = connect(stateToPropertyMapper, dispatcherToPropsMapper)(WidgetList)

export default App