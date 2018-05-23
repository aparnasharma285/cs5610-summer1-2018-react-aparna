import React from 'react';
import CourseList from './CourseList';
import CourseEditor from './CourseEditor';
import {BrowserRouter as Router, Route} from 'react-router-dom'


export default class CourseManager extends React.Component {
    render() {
        return (
            <Router>
                <div>
                <Route path="/courses" component={CourseList}>
                </Route>
                <Route path="/course/:courseId" component={CourseEditor}>
                </Route>
                </div>
            </Router>
        );
    }
}