import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import LessonService from "../services/LessonServiceClient";

export default class LessonTabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courseId: '',
            moduleId: '',
            lesson:{title:''},
            lessons: []
        }

        this.setCourseId = this.setCourseId.bind(this);
        this.setModuleId = this.setModuleId.bind(this);
        this.setLessonTitle = this.setLessonTitle.bind(this);
        this.createLesson = this.createLesson.bind(this);
        this.lessonService = LessonService.instance;
    };

    componentDidMount() {
        this.setCourseId(this.props.courseId);
        this.setModuleId(this.props.moduleId);

    }

    componentWillReceiveProps(newProps) {
        this.setCourseId(newProps.courseId);
        this.setModuleId(this.props.moduleId);
        this.findAllLessonsForModule(newProps.moduleId,newProps.courseId);
    }
    setCourseId(courseId) {
        return this.setState({courseId: courseId});
    }

    setModuleId(moduleId) {
        this.setState({moduleId: moduleId});
    }

    setLessonTitle(event) {
        this.setState({
            lesson: {title: event.target.value}
        })
    }

    createLesson() {

        this.lessonService.createLesson(this.state.courseId, this.state.moduleId,this.state.lesson)
            .then(() => {
                this.findAllLessonsForModule(this.state.moduleId, this.state.courseId);
            }).then(this.setState({
            lesson: {title: ""}
        }));
    }

    findAllLessonsForModule(moduleId, courseId) {
        this.lessonService
            .findAllLessonsForModule(moduleId,courseId)
            .then((lessons) => {
                this.setLessons(lessons)
            });
    }

    setLessons(lessons) {
        this.setState({lessons: lessons})
    }

    renderLessons(){
        let lessons = this.state.lessons.map((lesson) => {
            return <li key={lesson.id}>{lesson.title}</li>
    });
        return (
            <ul>{lessons}</ul>
        )
    }

    render() {
        return (
            <div>
                {this.renderLessons()}
                <input placeholder="New Lesson" value={this.state.lesson.title} onChange={this.setLessonTitle}/>
                <button onClick={this.createLesson}>Create</button>
            </div>
        );
    }

}