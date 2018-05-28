import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Provider, connect} from 'react-redux'
import {createStore} from 'redux'


class WidgetList extends React.Component{

    constructor(props) {
        super(props);
        this.props.findAllWidgets();
    }

    export const findAllWidgets = dispatch => {
        fetch('http://localhost:8080/api/widget')
            .then(response => (response.json()))
            .then(widgets => dispatch({
                type: FIND_ALL_WIDGETS,
                widgets: widgets }))
    }
}