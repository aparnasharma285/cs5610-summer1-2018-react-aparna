import React from 'react';
import {Link} from 'react-router-dom';


export default class LessonTabItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div><Link
                to={`/course/${this.props.courseId}/module/${this.props.moduleId}/lesson/${this.props.lesson.id}`}>
                {this.props.lesson.title}
            </Link>&nbsp;
                <i id='deleteLessonBtn' className='fa fa-times' onClick={() => {
                    if (window.confirm('Are you sure you want to delete lesson?')) {
                        this.props.deleteLesson(this.props.lesson.id);
                    }

                }}>
                </i>
            </div>
        )
    }
}