import React from 'react'


export default class CourseNavBar extends React.Component{
    constructor(){
        super();
        this.courseService = CourseService.instance;
        this.newCourseTitleAdded = this.newCourseTitle.bind(this);
        this.newCourseAdded = this.newCourseAdded.bind(this);
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
                       placeholder="New Course Title"/>&nbsp;
                <i className="fas fa-plus-circle fa-3x wbdv-newCourseBtn"></i>
            </div>
        </nav>
        );
    }
}