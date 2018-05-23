const MODULE_API_URL =
    'http://localhost:8080/api/course/CID/module';
const MODULE_API_DELETE_URL = 'http://localhost:8080/api/module/MODULE_ID';

let _singleton = Symbol();
export default class ModuleService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    findAllModulesForCourse(courseId) {
        return fetch(
            MODULE_API_URL
                .replace('CID', courseId))
            .then(function (response) {
                return response.json();
            }).catch()
    }

    createModule(courseId, module) {
        return fetch(MODULE_API_URL.replace('CID', courseId),
            {
                body: JSON.stringify(module),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            }).then(function (response)
        { return response.json(); })
    }

    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new ModuleService(_singleton);
        return this[_singleton]
    }

    deleteModule(moduleId) {
        return fetch(MODULE_API_DELETE_URL.replace
        ('MODULE_ID', moduleId), {
            method: 'delete'
        })
    }

}