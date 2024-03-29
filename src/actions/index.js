import * as constants from "../constants";



export const addWidget = dispatch => (
    dispatch({type: constants.ADD})
)

export const saveWidget = dispatch => (
    dispatch({type: constants.SAVE})
)

export const assignTopicId = (dispatch, topicId) => (
    fetch(('https://cs5610-java-server-aparna.herokuapp.com/api/topic/TID/widget').replace('TID', topicId))
        .then(response => (response.json()))
        .then(widgets => dispatch({
            type: constants.ASSIGN_TOPIC_ID,
            widgets: widgets,
            topicId: topicId
        }))
)


export const findAllWidgets = (dispatch, topicId) => {
    fetch(('https://cs5610-java-server-aparna.herokuapp.com/api/topic/TID/widget').replace('TID', topicId))
        .then(response => (response.json()))
        .then(widgets => dispatch({
            type: constants.FIND,
            widgets: widgets
        }))
}


export const deleteWidget =(dispatch,widgetId) => (
    dispatch({type: constants.DELETE, id: widgetId})
)

export const changeWidgetType = (dispatch,widgetId, newType) => (
    dispatch({
        type: constants.SELECT_WIDGET_TYPE,
        id: widgetId,
        widgetType: newType
    })
)

export const changeHeadingSize = (dispatch, widgetId, newSize) => (
    dispatch({
        type: constants.CHANGE_HEADING_SIZE,
        id:widgetId,
        size:newSize
    })
)

export const previewWidget =(dispatch) =>(
    dispatch({
        type : constants.PREVIEW
    })
)


export const imageUrlChanged=(dispatch, widgetId, newUrl) => (
    dispatch({
        type: constants.IMAGE_URL_CHANGED,
        id: widgetId,
        src: newUrl})
)

export const linkUrlChanged=(dispatch, widgetId, newUrl) => (
    dispatch({
        type: constants.LINK_URL_CHANGED,
        id: widgetId,
        href: newUrl})
)


export const widgetTextChanged=(dispatch, widgetId, newText) => (
    dispatch({
        type: constants.WIDGET_TEXT_CHANGED,
        id: widgetId,
        text: newText})
)


export const changeListType=(dispatch, widgetId, newListType) => (
    dispatch({
        type: constants.LIST_TYPE_CHANGED,
        id: widgetId,
        listType: newListType})
)

export const widgetMoveUp =(dispatch, widget) => (
    dispatch({
        type: constants.MOVE_UP,
        widget: widget
    })
)

export const widgetMoveDown =(dispatch, widget) => (
    dispatch({
        type: constants.MOVE_DOWN,
        widget: widget
    })
)

export const widgetNameChanged =(dispatch, widgetId, newName) => (
    dispatch({
        type: constants.WIDGET_NAME_CHANGED,
        id: widgetId,
        name: newName
    })
)

export const widgetEdit =(dispatch, widgetId) => (
    dispatch({
        type: constants.EDIT_WIDGET,
        id: widgetId
    })
)

export const widgetEditDone =(dispatch, widgetId) => (
    dispatch({
        type: constants.EDIT_WIDGET_DONE,
        id: widgetId
    })
)