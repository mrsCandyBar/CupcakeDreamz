import React from 'react';
import dispatcher from "./helpers/dispatcher";
import Build from './actions/_build.js';

export default class Service extends React.Component {

    constructor(props) {
        super(props);
        this.createActions();
    }

    createActions() {
        this.actions = {
            randomize   : document.getElementById('randomize')
        }
        this.bindUIevents();
        this.actions['randomize'].click();
    }

    bindUIevents() {
        let builder = this.props.builder;

        this.actions['randomize'].onclick = function(event) {
            let returnObj = Build.randomItem(builder);

            dispatcher.dispatch({
                actionType: 'update',
                payload: returnObj
            });
        };

    }
}