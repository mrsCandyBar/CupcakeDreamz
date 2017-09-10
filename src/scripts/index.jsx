import React from 'react';
import {render} from 'react-dom';
import SVG from './helpers/svg.jsx';
import createStore from './store.jsx';
import createService from './service.jsx';
import Cake from './components/Cake.jsx';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.Store = new createStore();
        this.Service = new createService(this.Store);
    }

    render () {
        return (
            <main>
                <SVG />
                <Cake build={ this.Store.brief } />
            </main>
        );
    }
}

// Run App
render(<App/>, document.getElementById('main'));
