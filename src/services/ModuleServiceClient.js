const MODULE_API_URL = 'https://cs5610-java-server-aparna.herokuapp.com/api/course/CID/module';
const ALL_MODULE_API_URL = 'https://cs5610-java-server-aparna.herokuapp.com/api/module';

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
            }).catch(function (){return {};})
    }

    findAllModules() {
        return fetch(
            ALL_MODULE_API_URL)
            .then(function (response) {
                return response.json();
            }).catch(function (){return {};})
    }

    findModulesById(moduleId) {
        return fetch(ALL_MODULE_API_URL+'/'+moduleId)
            .then(function (response) {
                return response.json();
            }).catch(function (){return {};})
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

    deleteModule(moduleId) {
        return fetch(ALL_MODULE_API_URL+'/'+moduleId, {
            method: 'delete'
        })
    }

    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new ModuleService(_singleton);
        return this[_singleton]
    }



}