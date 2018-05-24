import React from 'react';
import {Link} from 'react-router-dom';

export default class CourseRow extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="row wbdv-courseGridItem">
                <div className="col-3"><i className="fa fa-file"></i> &nbsp;
                    <Link to={`/course/${this.props.course.id}`} className="wbdv-courseName">{this.props.course.title}</Link>
                </div>
                <div className="col-3">me</div>
                <div className="col-3">{this.props.course.modified}</div>
                <div className="col-3"><i className="fa fa-times" onClick={() => this.props.deleteCourse(this.props.course.id)}></i></div>
            </div>

        );
    }
}