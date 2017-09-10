import React from 'react';

export default class Cake extends React.Component {

    constructor(props) {
        super(props);
        this.state = { date: new Date()};
        this.message = props.message;
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(), 1000
        )
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    render() {
        return (
            <div>
                <h1>The Time is : { this.state.date.toLocaleTimeString() } , { this.message }</h1>
            </div>
        );
    };
}