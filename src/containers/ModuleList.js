import React, {Component} from 'react'
import ModuleListItem from '../components/ModuleListItem';
import ModuleService from '../services/ModuleServiceClient';

export default class ModuleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courseId: '',
            module: {title: ''},
            modules: []
        };
        this.setCourseId = this.setCourseId.bind(this);
        this.setModuleTitle = this.setModuleTitle.bind(this);
        this.createModule = this.createModule.bind(this);
        this.moduleService = ModuleService.instance;

    }

    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }

    componentDidMount() {
        this.setCourseId(this.props.courseId);
    }

    componentWillReceiveProps(newProps){
        this.setCourseId(newProps.courseId);
        this.findAllModulesForCourse(newProps.courseId)
    }

    findAllModulesForCourse(courseId) {
        this.moduleService
            .findAllModulesForCourse(courseId)
            .then((modules) => {this.setModules(modules)});
    }

    setModules(modules) {
        this.setState({modules: modules})
    }


    setModuleTitle(event) {
        this.setState({
            module: {title: event.target.value}
        })
    }

    createModule() {

        this.moduleService.createModule
        (this.state.courseId, this.state.module)
            .then(()=>{this.findAllModulesForCourse(this.state.courseId);
            }).then(this.setState({
            module: {title: ""}
        }));
    }


    renderModules() {
        let modules = this.state.modules.map((module) => {
            return <li key={module.id}>{module.title}</li>
        });
        return (
            <ul>{modules}</ul>
        )

    }

    render(){
        return (
            <div>
                {this.renderModules()}
                <input placeholder="New Module" value={this.state.module.title} onChange={this.setModuleTitle}/>
                <button onClick={this.createModule}>Create</button>
            </div>


        );
    }
}

