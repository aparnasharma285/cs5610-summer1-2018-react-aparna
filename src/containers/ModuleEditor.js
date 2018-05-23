import React from 'react';

export default class ModuleEditor
    extends React.Component {

    constructor(props) {
        super(props);
        this.state = {courseId: '',
                      moduleId: '',
                      module:[]
        };

        this.setCourseId = this.setCourseId.bind(this);
        this.setModuleId = this.setModuleId.bind(this);
    }

    componentDidMount() {
        this.setCourseId(this.props.match.params.courseId);
        this.setModuleId(this.props.match.params.moduleId);
    }

    componentWillReceiveProps(newProps) {
        this.setCourseId(newProps.match.params.courseId);
        this.setModuleId(newProps.match.params.moduleId);
    }


    setCourseId(courseId) {
        this.setState
        ({courseId: courseId});
    }

    setModuleId(moduleId) {
        this.setState
        ({moduleId: moduleId});
    }

    render() {
        return (
            <h1>Module Editor
        {this.state.courseId}
        {this.state.moduleId}</h1>

    )
    }
}
