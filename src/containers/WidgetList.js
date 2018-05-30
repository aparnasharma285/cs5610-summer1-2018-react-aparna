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

                <button className='btn btn-success' id='saveWidgetsBtn'
                        onClick={this.props.saveWidget}>Save
                </button>&nbsp; &nbsp;
                <i className="fa fa-3x fa-plus-circle wbdv-new-widget" onClick={this.props.addWidget}></i>&nbsp;
                <label className="wbdv-preview-label"><b>Preview</b> &nbsp;
                <label className="switch">
                    <input type="checkbox" onClick={this.props.previewWidget}/>
                    <span className="slider round"></span>
                </label></label>


                {this.props.widgets.map((widget,index) => (<WidgetContainer widgetindex={index} key={widget.id} widget={widget}/>))}

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