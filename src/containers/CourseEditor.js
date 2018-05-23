import React from 'react'
import CourseServiceClient from '../services/CourseServiceClient';
import CourseEditorNavBar from "../components/CourseEditorNavBar";

export default class CourseEditor extends React.Component {

    constructor(props) {
        super(props)
        this.state = {courseId: '', course: []};
        this.courseService = CourseServiceClient.instance;
    }

    componentDidMount() {
        this.selectCourse(this.props.match.params.courseId);
    }

    selectCourse(courseId) {
        this.setState({courseId: courseId});
        this.courseService.findCourseById(courseId)
            .then((course) => this.setState({course: course}));
    }

    render() {

        return (
            <div className="wbdv-courseEditorBlock">
                <CourseEditorNavBar course={this.state.course}/>
                </div>
        );
    }
}