import React from 'react'
import CourseServiceClient from '../services/CourseServiceClient';
import ModuleList from '../containers/ModuleList';

export default class CourseEditorSidebar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {course: []};
        this.courseService = CourseServiceClient.instance;
    }

    render(){
        return(
            <div className='col-4 wbdv-courseSidebar'>
                <ModuleList/>
            </div>
        );
    }
}