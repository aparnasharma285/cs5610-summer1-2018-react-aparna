import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import LessonService from "../services/LessonServiceClient";
import LessonTabItem from "../components/LessonTabItem";

export default class LessonTabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courseId: '',
            moduleId: '',
            lesson: {title: ''},
            lessons: []
        }

        this.setCourseId = this.setCourseId.bind(this);
        this.setModuleId = this.setModuleId.bind(this);
        this.setLessonTitle = this.setLessonTitle.bind(this);
        this.createLesson = this.createLesson.bind(this);
        this.deleteLesson = this.deleteLesson.bind(this);
        this.lessonService = LessonService.instance;
    };

    componentDidMount() {
        this.setCourseId(this.props.courseId);
        this.setModuleId(this.props.moduleId);
    }

    componentWillReceiveProps(newProps) {
        this.setCourseId(newProps.courseId);
        this.setModuleId(newProps.moduleId);
        this.findAllLessonsForModule(newProps.moduleId, newProps.courseId);
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

        this.lessonService.createLesson(this.state.courseId, this.state.moduleId, this.state.lesson)
            .then(() => {
                this.findAllLessonsForModule(this.state.moduleId, this.state.courseId);
            }).then(this.setState({
            lesson: {title: ""}
        }));
    }

    findAllLessonsForModule(moduleId, courseId) {
        console.log(this.state);
        return this.lessonService
            .findAllLessonsForModule(moduleId, courseId)
            .then((lessons) => {
                return this.setLessons(lessons);
            });
    }

    setLessons(lessons) {
        this.setState({lessons: lessons})
    }

    renderLessons() {
        let lessons = this.state.lessons.map((lesson) => {
            return <LessonTabItem key={lesson.id} lesson={lesson} moduleId={this.state.moduleId}
                                  courseId={this.state.courseId}
                                  deleteLesson={this.deleteLesson} />
        });
        return (
            <ul>{lessons}</ul>
        )
    }

    deleteLesson(lessonId) {
        this.lessonService.deleteLesson(lessonId)
            .then(this.findAllLessonsForModule(this.state.moduleId,this.state.courseId))
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
