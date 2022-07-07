import React from 'react';
import BuildOptions from './store/_store_builder.js';
import DOMLocations from './store/_store_locations.js';
import dispatcher from './helpers/dispatcher.js';

export default class Store extends React.Component {

    constructor(props) {
        super(props);
        this.items    = [];
        this.brief    = {};
        this.active   = 0;
        this.builder  = BuildOptions;
        this.$dom     = DOMLocations;

        this.subscribeToEvents();
    }

    subscribeToEvents() {
        let $this = this;
        dispatcher.register(function(data) {
            if (data.actionType === 'update') {
                $this.brief = data.payload;
            }
        });
    }

}