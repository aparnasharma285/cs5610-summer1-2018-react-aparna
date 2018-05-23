import React, {Component} from 'react'
import ModuleListItem from '../components/ModuleListItem';
import ModuleService from '../services/ModuleServiceClient';
import ModuleEditor from './ModuleEditor';
import {BrowserRouter as Router, Route} from 'react-router-dom'

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
        this.deleteModule = this.deleteModule.bind(this);
        this.moduleService = ModuleService.instance;

    }

    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }

    componentDidMount() {
        this.setCourseId(this.props.courseId);
    }

    componentWillReceiveProps(newProps) {
        this.setCourseId(newProps.courseId);
        this.findAllModulesForCourse(newProps.courseId)
    }

    findAllModulesForCourse(courseId) {
        this.moduleService
            .findAllModulesForCourse(courseId)
            .then((modules) => {
                this.setModules(modules)
            });
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
            .then(() => {
                this.findAllModulesForCourse(this.state.courseId);
            }).then(this.setState({
            module: {title: ""}
        }));
    }

    deleteModule(moduleId) {
        this.moduleService
            .deleteModule(moduleId)
            .then(() => {
                this.findAllModulesForCourse
                (this.state.courseId)
            });

    }

    renderModules() {
        let modules = this.state.modules.map((module) => {
            return <ModuleListItem key={module.id} module={module} courseId={this.state.courseId}
                                   delete={this.deleteModule}/>
        });
        return (
            <ul className="list-group">{modules}</ul>
        )

    }

    render() {
        return (
            <Router>
                <div className='container-fluid'>
                <div className='row'>
                    <div className="col-4 wbdv-moduleListSideBar">
                        <div className='bg-dark wbdv-courseTitleBar'>
                            <b>{this.props.course.title}</b>
                        </div>
                        <div className="container wbdv-module-list-box">
                        {this.renderModules()}
                        <input placeholder="New Module" value={this.state.module.title} onChange={this.setModuleTitle}/>
                        <i className='fa fa-plus' id='createNewModuleBtn' onClick={this.createModule}></i>
                        </div>
                    </div>
                    <div className="col-8 ">
                        <Route path="/course/:courseId/module/:moduleId"
                               component={ModuleEditor}/>
                    </div>
                </div>
                </div>
            </Router>

        );
    }
}
