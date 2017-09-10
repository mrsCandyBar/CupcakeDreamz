import React from 'react';
import {render} from 'react-dom';
import Cake from './components.jsx';
import SVG from './svg.jsx';
import CakeUser from './cakeUser.jsx';
import ItemGenerator from './main.js';

let startApp = new ItemGenerator();

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            brief: startApp.store.brief
        }
    }

    render () {
        return (
            <main>
                <SVG />
                <CakeUser build={ this.state.brief} />
            </main>
        );
    }
}

// Run App
render(<App/>, document.getElementById('main'));
