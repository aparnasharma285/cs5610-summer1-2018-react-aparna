import React from 'react';


export default class LessonTabItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>{this.props.lesson.title}&nbsp;
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