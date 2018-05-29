import * as constants from "../constants";


export const widgetReducer = (state = {widgets: [], topicId: 0}, action) => {
    switch (action.type) {
        case constants.ADD:
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
        case constants.DELETE:
            return {
                widgets: state.widgets.filter(widget => (
                    widget.id !== action.id
                )),

                topicId: state.topicId
            }
        case constants.FIND:
            return {
                widgets: action.widgets,
                topicId: state.topicId
            }

        case constants.SAVE:
            fetch(('https://cs5610-java-server-aparna.herokuapp.com/api/widget/save/TID').replace('TID', state.topicId), {
                method: 'post',
                body: JSON.stringify(state.widgets),
                headers: {
                    'content-type': 'application/json'
                }
            })
            return state
        case constants.ASSIGN_TOPIC_ID:
            return {
                widgets: action.widgets,
                topicId: action.topicId
            }
        case constants.SELECT_WIDGET_TYPE:
            let newState = {
                widgets: state.widgets.filter((widget) => {
                    if (widget.id === action.id) {
                        widget.widgetType = action.widgetType
                    }
                    return true;
                }),
                topicId: state.topicId
            }
            return JSON.parse(JSON.stringify(newState))
        case constants.CHANGE_HEADING_SIZE:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.size = action.size
                    }
                    return Object.assign({}, widget)
                }),
                topicId: state.topicId
            }

        case constants.HEADING_TEXT_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.text = action.text
                    }
                    return Object.assign({}, widget)
                }),
                topicId: state.topicId
            }
        default:
            return state
    }
}
