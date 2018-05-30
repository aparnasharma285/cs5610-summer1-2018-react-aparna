import * as constants from "../constants";
import 'array.prototype.move';


export const widgetReducer = (state = {widgets: [], topicId: 0, preview: false}, action) => {
    let newState
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
                preview: state.preview,
                topicId: state.topicId,
                editWidgetId:state.editWidgetId
            }

        case constants.DELETE:
            return {
                widgets: state.widgets.filter(widget => (
                    widget.id !== action.id
                )),
                preview: state.preview,
                topicId: state.topicId,
                editWidgetId:state.editWidgetId
            }

        case constants.FIND:
            return {
                widgets: action.widgets,
                preview: state.preview,
                topicId: state.topicId,
                editWidgetId:state.editWidgetId
            }

        case constants.SAVE:
            fetch(('https://cs5610-java-server-aparna.herokuapp.com/api/widget/save/TID').replace('TID', state.topicId), {
                method: 'post',
                body: JSON.stringify(state.widgets),
                headers: {
                    'content-type': 'application/json'
                }
            }).then(alert("Widgets Saved"))
            return state

        case constants.PREVIEW :
            return {
                widgets: state.widgets,
                preview: !state.preview,
                topicId: state.topicId,
                editWidgetId:state.editWidgetId
            }

        case constants.EDIT_WIDGET:
            return{
                widgets: state.widgets,
                preview: !state.preview,
                topicId: state.topicId,
                editWidgetId: action.id
            }

        case constants.EDIT_WIDGET_DONE:
            return{
                widgets: state.widgets,
                preview: !state.preview,
                topicId: state.topicId,
                editWidgetId: ''
            }
        case constants.ASSIGN_TOPIC_ID:
            return {
                widgets: action.widgets,
                preview: state.preview,
                topicId: action.topicId,
                editWidgetId:state.editWidgetId
            }

        case constants.SELECT_WIDGET_TYPE:
            let newState = {
                widgets: state.widgets.filter((widget) => {
                    if (widget.id === action.id) {
                        widget.widgetType = action.widgetType
                    }
                    return true;
                }),
                preview: state.preview,
                topicId: state.topicId,
                editWidgetId:state.editWidgetId
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
                preview: state.preview,
                topicId: state.topicId,
                editWidgetId:state.editWidgetId
            }

        case constants.WIDGET_TEXT_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.text = action.text
                    }
                    return Object.assign({}, widget)
                }),
                preview: state.preview,
                topicId: state.topicId,
                editWidgetId:state.editWidgetId
            }

        case constants.WIDGET_NAME_CHANGED: {
            let flag = 0
            widgets: state.widgets.map(widget => {
                if ((widget.name == action.name) && (widget.id != action.id)) {
                    flag = 1
                    alert("Oops Sorry!! This widget name already exists")
                }
            })
            if (flag == 1) {
                return state
            } else {
                return {
                    widgets: state.widgets.map(widget => {
                        if (widget.id === action.id) {
                            widget.name = action.name
                        }
                        return Object.assign({}, widget)
                    }),
                    preview: state.preview,
                    topicId: state.topicId,
                    editWidgetId:state.editWidgetId
                }
            }
        }

        case constants.IMAGE_URL_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.src = action.src
                    }
                    return Object.assign({}, widget)
                }),
                preview: state.preview,
                topicId: state.topicId,
                editWidgetId:state.editWidgetId
            }

        case constants.LINK_URL_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.href = action.href
                    }
                    return Object.assign({}, widget)
                }),
                preview: state.preview,
                topicId: state.topicId,
                editWidgetId:state.editWidgetId
            }

        case constants.LIST_TYPE_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.listType = action.listType
                    }
                    return Object.assign({}, widget)
                }),
                preview: state.preview,
                topicId: state.topicId,
                editWidgetId:state.editWidgetId
            }

        case constants.MOVE_UP :
            let index = state.widgets.indexOf(action.widget);
            state.widgets.move(index, index - 1);
            return {
                widgets: (state.widgets.splice(0)),
                preview: state.preview,
                topicId: state.topicId,
                editWidgetId:state.editWidgetId
            }
        case constants.MOVE_DOWN :
            index = state.widgets.indexOf(action.widget);
            (state.widgets.move(index, index + 1))
            return {
                widgets: (state.widgets.splice(0)),
                preview: state.preview,
                topicId: state.topicId,
                editWidgetId:state.editWidgetId
            }
        default:
            return state
    }
}
