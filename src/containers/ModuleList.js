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

    }


render(){
        return(
            <div className='wbdv-moduleListBar'>
                <ModuleListItem />
                <input type='text' className='form-control' id='newModuleFld'/>
                <i className="fa fa-plus fa-2x"></i>
            </div>
        );
}
}

