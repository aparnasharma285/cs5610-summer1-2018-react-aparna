import React from 'react';
import {Provider} from 'react-redux'
import App,{store} from './WidgetList'

export default class TopicEditor extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            courseId: '',
            moduleId: '',
            lessonId: '',
            topicId: '',
            topics: []
        };

        this.setCourseId = this.setCourseId.bind(this);
        this.setModuleId = this.setModuleId.bind(this);
        this.setLessonId = this.setLessonId.bind(this);
        this.setTopicId = this.setTopicId.bind(this);
    }

    componentDidMount() {
        this.setCourseId(this.props.match.params.courseId);
        this.setModuleId(this.props.match.params.moduleId);
        this.setLessonId(this.props.match.params.lessonId);
        this.setTopicId(this.props.match.params.topicId);
    }

    componentWillReceiveProps(newProps) {
        this.setCourseId(newProps.match.params.courseId);
        this.setModuleId(newProps.match.params.moduleId);
        this.setLessonId(newProps.match.params.lessonId);
        this.setTopicId(newProps.match.params.topicId);
    }

    setCourseId(courseId) {
        this.setState
        ({courseId: courseId});
    }

    setModuleId(moduleId) {
        this.setState
        ({moduleId: moduleId});
    }

    setLessonId(lessonId) {
        this.setState
        ({lessonId: lessonId});
    }

    setTopicId(topicId) {
        this.setState
        ({topicId: topicId});
    }


        render() {
            return (
                <div><br/>
                <Provider store={store}>
                <App topicId={this.state.topicId}/>
                </Provider>
                </div>
            )
        }
    }