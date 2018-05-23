import React from 'react';
import CourseRow from '../components/CourseRow';
import CourseServiceClient from "../services/CourseServiceClient";
import CreateCourseForm from "../components/CreateCourseForm";

export default class CourseList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {courses: []};
        this.courseService = CourseServiceClient.instance;
        this.updateStateCourses = this.updateStateCourses.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
    }

    componentDidMount() {
        this.updateStateCourses();
    }

    updateStateCourses() {
        return this.courseService.findAllCourses()
            .then((courses) => {
                return this.setState({courses: courses});
            });
    }

    deleteCourse(courseId) {
        return this.courseService.deleteCourse(courseId)
            .then(() => this.updateStateCourses());
    }


    renderCourseListItems() {
        var courses = this.state.courses.map(
            (course) => {return (<CourseRow course={course} key={course.id} deleteCourse={this.deleteCourse} />)}
        );

        return (
            courses
        );
    }

    render() {
        return (
            <div className="wbdv-allCoursesView">
                <CreateCourseForm updateStateCourses={this.updateStateCourses}/>
                <div className="row wbdv-courseGridHearder">
                    <div className="col-3"><b>Title</b></div>
                    <div className="col-2"><b>Owned by</b></div>
                    <div className="col-3">Last modified by me</div>
                    <div className="col-4"><i className="fa fa-sort-alpha-down"></i></div>
                </div>
                <div className="container">
                    <div id="courseTable" className="wbdv-courseGrid">
                        <div className="row wbdv-courseGridHeader">
                        </div>
                        <div className="wbdv-courseGridBody">
                            {this.renderCourseListItems()}
                        </div>
                    </div>
                    <div className="col-md-1"></div>
                </div>
            </div>
        );
    }
}