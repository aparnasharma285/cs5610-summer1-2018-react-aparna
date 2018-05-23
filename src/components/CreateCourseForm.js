import React from 'react'
import CourseList from '../containers/CourseList';
import CourseServiceClient from "../services/CourseServiceClient";

export default class CreateCourseForm extends React.Component{
    constructor(props){
        super(props);
        this.state={course: {title: ''}}
        this.courseService = CourseServiceClient.instance;
        this.newCourseTitleAdded = this.newCourseTitleAdded.bind(this);
        this.newCourseAdded = this.newCourseAdded.bind(this);
    }

    newCourseTitleAdded(event){
        this.setState({
            course: {title: event.target.value}
        });
    }

    newCourseAdded(){
        this.courseService
            .createCourse(this.state.course)
            .then(this.props.updateStateCourses)
            .then(this.setState({
                course: {title: ""}
            }));
    }

    render(){
        return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <a className="navbar-brand" href="#"><h4><b>Course Manager</b></h4></a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01"
                    aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="courseManagerNavbar">
                <input type="text" id="newCourseFld" className="form-control"
                       value= {this.state.course.title} placeholder="New Course Title" onChange={this.newCourseTitleAdded}/>&nbsp;
                <i className="fas fa-plus-circle fa-3x wbdv-newCourseBtn" onClick={this.newCourseAdded}></i>
            </div>
        </nav>
        );
    }
}