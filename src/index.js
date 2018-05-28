import React from 'react';
import ReactDOM from 'react-dom';
import CourseManager from './containers/CourseManager';
import './CourseManager.style.client.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';

ReactDOM.render(
    <div className="courseManagerIndex">
        <CourseManager/>
    </div>,
    document.getElementById('root'));
