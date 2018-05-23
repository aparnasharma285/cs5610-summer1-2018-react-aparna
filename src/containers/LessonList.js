import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import LessonService from "../services/LessonServiceClient";


export default class LessonList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courseId: '',
            moduleId: '',
            lessons: []
        }

        this.setCourseId = this.setCourseId.bind(this);
        this.setModuleId = this.setModuleId.bind(this);
        this.setLessonTitle = this.setLessonTitle.bind(this);
        this.createLesson = this.createLesson.bind(this);
        this.lessonService = LessonService.instance;
    };

    setCourseId(courseId) {
        this.setState({courseId: courseId});
        console.log(this.state.courseId);
    }

    setModuleId(moduleId) {
        this.setState({moduleId: moduleId});
        console.log(this.state.moduleId);
    }



}