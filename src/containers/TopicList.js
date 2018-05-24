import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import TopicService from "../services/TopicServiceClient";
import TopicListItem from "../components/TopicListItem";

export default class TopicList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courseId: '',
            moduleId: '',
            lessonId: '',
            topic: {title: ''},
            topics: []
        }

        this.setCourseId = this.setCourseId.bind(this);
        this.setModuleId = this.setModuleId.bind(this);
        this.setTopics = this.setTopics.bind(this);
        this.setTopicTitle = this.setTopicTitle.bind(this);
        this.createTopic = this.createTopic.bind(this);
        this.deleteTopic = this.deleteTopic.bind(this);
        this.topicService = TopicService.instance;
    };

    componentDidMount() {
        this.setCourseId(this.props.courseId);
        this.setModuleId(this.props.moduleId);
        this.setLessonId(this.props.lessonId);
    }

    componentWillReceiveProps(newProps) {
        this.setCourseId(newProps.courseId);
        this.setModuleId(newProps.moduleId);
        this.setLessonId(newProps.lessonId);
        this.findAllTopicsForLesson(newProps.lessonId);
    }

    setCourseId(courseId) {
        return this.setState({courseId: courseId});
    }

    setModuleId(moduleId) {
        this.setState({moduleId: moduleId});
    }

    setLessonId(lessonId) {
        this.setState({lessonId: lessonId});
    }

    setTopicTitle(event) {
        this.setState({
            topic: {title: event.target.value}
        })
    }

    createTopic() {

        this.topicService.createTopic(this.state.lessonId, this.state.topic)
            .then(() => {
                this.findAllTopicsForLesson(this.state.lessonId);
            }).then(this.setState({
            topic: {title: ""}
        }));
    }

    findAllTopicsForLesson(lessonId) {
        return this.topicService
            .findAllTopicsForLesson(lessonId)
            .then((topics) => {
                return this.setTopics(topics);
            });
    }

    setTopics(topics) {
        this.setState({topics: topics})
    }

    renderTopics() {
        let topics = this.state.topics.map((topic) => {
            return (
                <li className="nav-item">
                    <a className="nav-link" href="#">
                        <TopicListItem key={topic.id} topic={topic} lessonId={this.state.lessonId}
                                       moduleId={this.state.moduleId}
                                       courseId={this.state.courseId}
                                       deleteTopic={this.deleteTopic}/>
                    </a>
                </li>)
        });
        return (
            <ul className="nav nav-pills mr-autos col">{topics}</ul>
        )
    }

    deleteTopic(topicId) {
        this.topicService.deleteTopic(topicId)
            .then(this.findAllTopicsForLesson(this.state.lessonId))
    }

    render() {
        return (
            <div className='row'>
                {this.renderTopics()}
                    &nbsp;&nbsp;<input id='newTopicFld' className='form-control-sm' placeholder="New Topic"
                           value={this.state.topic.title} onChange={this.setTopicTitle}/>&nbsp;
                    <i id='createNewTopicBtn' className='fa fa-2x fa-plus' onClick={this.createTopic}></i>
            </div>

        );
    }

}
