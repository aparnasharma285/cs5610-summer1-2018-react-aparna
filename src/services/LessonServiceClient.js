const LESSON_API_CREATE_URL = 'http://localhost:8080/api/course/CID/module/MID/lesson';
const LESSON_API_URL = 'http://localhost:8080/api/lesson';
const LESSON_MODULE_API_URL ='http://localhost:8080/api/course/CID/module/MID/lesson';
const SPECIFIC_LESSON_API_URL = 'http://localhost:8080/api/lesson/LID'

let _singleton = Symbol();
export default class LessonService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    findAllLessonsForModule(moduleId, courseId) {
        return fetch(
            (LESSON_MODULE_API_URL
                .replace('CID', courseId))
                .replace('MID', moduleId))
            .then(function (response) {
                return response.json();
            }).catch(function (){return {};})
    }

    findAllLessons() {
        return fetch(LESSON_API_URL)
            .then(function (response) {
                return response.json();
            }).catch(function (){return {};})
    }

    findLessonsById(lessonId) {
        return fetch(LESSON_API_URL+'/'+lessonId)
            .then(function (response) {
                return response.json();
            }).catch(function (){return {};})
    }

    createLesson(courseId, moduleId, lesson) {
        return fetch((LESSON_API_CREATE_URL.replace('CID', courseId)).replace('MID', moduleId),
            {
                body: JSON.stringify(lesson),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            }).then(function (response)
        { return response.json(); })
    }

    deleteLesson(lessonId){
        return fetch(SPECIFIC_LESSON_API_URL.replace
        ('LID', lessonId), {
            method: 'delete'
        })
    }

    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new LessonService(_singleton);
        return this[_singleton]
    }


}