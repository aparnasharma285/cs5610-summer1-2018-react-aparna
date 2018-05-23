import React from 'react';
import {Link} from 'react-router-dom';

export default class ModuleListItem extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <li className="list-group-item list-group-item-action"><Link
                to={`/course/${this.props.courseId}/module/${this.props.module.id}`}>
                {this.props.module.title}
            </Link>
                <i className='fa fa-times fa' id='deleteModuleBtn' onClick={() => {
                    this.props.delete
                    (this.props.module.id)
                }}></i>
            </li>
        )
    }
}