import React from 'react'
import CourseServiceClient from "../services/CourseServiceClient";
import CourseEditor from '../containers/CourseEditor';
import CourseEditorSidebar from "./CourseEditorSidebar";

export default class CourseEditorNavBar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {courseId: '', course: [],isHidden: true};
        this.courseService = CourseServiceClient.instance;
    }

    toggleHidden () {
        this.setState({
            isHidden: !this.state.isHidden
        })
    }

    render() {
        return (
            <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark wbdv-courseEditorNav">
                <a className="navbar-brand col-sm-5" href="#">
                    <i className="fa fa-bars" onClick={this.toggleHidden.bind(this)}></i>
                    &nbsp;&nbsp;{this.props.course.title}</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02"
                        aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto wbdv-courseEditorNavOptions">
                        <li className="nav-item col-2">
                            <a className="nav-link" href="#">Build </a>
                        </li>
                        <li className="nav-item active col-2">
                            <a className="nav-link" href="#">Pages<span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item col-2">
                            <a className="nav-link" href="#">Theme</a>
                        </li>
                        <li className="nav-item col-2">
                            <a className="nav-link" href="#">Store</a>
                        </li>
                        <li className="nav-item col-2">
                            <a className="nav-link" href="#">Apps</a>
                        </li>
                        <li className="nav-item col-2">
                            <a className="nav-link" href="#">Settings</a>
                        </li>
                    </ul>
                    <button className="btn btn-secondary my-2 my-sm-0" type="submit">
                        <i className="fa fa-2x fa-plus"></i>
                    </button>
                </div>
            </nav>
                {!this.state.isHidden && <CourseEditorSidebar/>}
            </div>

        );
    }

}