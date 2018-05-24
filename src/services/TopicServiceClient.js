const TOPIC_API_CREATE_URL = 'http://localhost:8080/api/lesson/LID/topic';
const TOPIC_API_URL = 'http://localhost:8080/api/lesson/LID/topic';
const TOPIC_DELETE_API_URL = 'http://localhost:8080/api/topic/TID';


let _singleton = Symbol();
export default class TopicService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    findAllTopicsForLesson(lessonId) {
        return fetch(TOPIC_API_URL.replace('LID', lessonId))
            .then(function (response) {
                return response.json();
            }).catch(function () {
                return {};
            })}




    createTopic(lessonId,topic) {
        return fetch((TOPIC_API_CREATE_URL.replace('LID', lessonId)),
            {
                body: JSON.stringify(topic),
                headers: {'Content-Type': 'application/json'},
                method: 'POST'
            }).then(function (response) {
            return response.json();
        })
    }

    deleteTopic(topicId) {
        return fetch(TOPIC_DELETE_API_URL.replace
        ('TID', topicId), {
            method: 'delete'
        })
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new TopicService(_singleton);
        return this[_singleton]
    }


}