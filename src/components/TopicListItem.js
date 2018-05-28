import React from 'react';
import {Link} from 'react-router-dom';


export default class TopicListItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='text-black-50'>
                <span className='btn btn-dark wbdv-topics'>
                    <Link to={`/course/${this.props.courseId}/module/${this.props.moduleId}/lesson/${this.props.lessonId}/topic/${this.props.topic.id}`}>
                {this.props.topic.title}
                        <i id='deleteTopicBtn' className='fa fa-times' onClick={() => {
                            if (window.confirm('Are you sure you want to delete topic?')) {
                                this.props.deleteTopic(this.props.topic.id);
                            }

                        }}>
                </i>
            </Link>

            </span>
            </div>
        )
    }
}