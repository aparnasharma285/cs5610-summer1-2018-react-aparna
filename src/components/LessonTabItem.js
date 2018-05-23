import React from 'react';


export default class LessonTabItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li>{this.props.lesson.title}
                <i className='fa fa-times' onClick={() => {
                    this.props.deleteLesson(this.props.lesson.id)
                }}>
                </i>
            </li>
        )
    }
}