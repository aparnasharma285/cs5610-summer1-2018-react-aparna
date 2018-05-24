import React from 'react';
import {Link} from 'react-router-dom';


export default class TopicListItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='text-black-50'>{this.props.topic.title}&nbsp;
                <i id='deleteTopicBtn' className='fa fa-times' onClick={() => {
                    if (window.confirm('Are you sure you want to delete topic?')) {
                        this.props.deleteTopic(this.props.topic.id);
                    }

                }}>
                </i>
            </div>
        )
    }
}