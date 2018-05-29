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

export const changeWidgetType = (dispatch,widgetId, selectElement) => (
    dispatch({
        type: constants.SELECT_WIDGET_TYPE,
        id: widgetId,
        widgetType: selectElement.value
    })
)
