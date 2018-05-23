import React from 'react'
import CourseServiceClient from '../services/CourseServiceClient';
import ModuleList from './ModuleList';

export default class CourseEditor extends React.Component {

    constructor(props) {
        super(props)
        this.state = {courseId: '', course: []};
        this.courseService = CourseServiceClient.instance;
    }

    componentDidMount() {
        this.selectCourse(this.props.match.params.courseId);
    }

    componentWillReceiveProps(newProps) {
        this.selectCourse(newProps.match.params.courseId);
    }

    selectCourse(courseId) {
        this.setState({courseId: courseId});
        this.courseService.findCourseById(courseId)
            .then((course) => this.setState({course: course}));
    }

    render() {

        return (
            <div>
                <div className='col-xs-6 col-md-4 bg-dark wbdv-moduleTopBar'>
                    <b>{this.state.course.title}</b>
                </div>
                <ModuleList
                    courseId={this.state.courseId}/>
            </div>
        );
    }
}