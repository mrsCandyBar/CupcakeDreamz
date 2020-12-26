import React from 'react';
import { Typography, withStyles } from '@material-ui/core';
import { countStyles } from '../assets/styles/layout';

interface ICountdownProps {
    classes: any;
    generateNewCupcake(): any;
}
interface ICountdownState {
    classes: any;
    count: number;
}

class Countdown extends React.Component<ICountdownProps, ICountdownState> {

    constructor(props: ICountdownProps) {
        super(props);
        this.state = {
            classes: this.props.classes,
            count: 0
        }
    }

    componentDidMount() {
        this.setState({
            count: 3
        });
    }

    componentDidUpdate() {
        setTimeout(() => {
            if (this.state.count > 1) {
                this.setState({
                    count: this.state.count - 1
                });
            } else {
                this.props.generateNewCupcake();
            }
        }, 600);
    }

    render() {
        const { count, classes } = this.state;
        return (
            <Typography component="h1" className={classes.fontStyle}>
                {count !== 0 && count}
            </Typography>
        )
    }
}

export default withStyles(countStyles)(Countdown);