import React from 'react';
import { Typography, withStyles } from '@material-ui/core';
import { countStyles } from '../assets/styles/layout';

interface ITimerProps {
    classes: any;
    getTimeParams(event: number): any;
    successfull: boolean;
}
interface ITimerState {
    classes: any;
    count: number;
    successfull: boolean;
    pause: boolean;
}

class Timer extends React.Component<ITimerProps, ITimerState> {

    static getDerivedStateFromProps(nextState: ITimerProps, prevProps: ITimerState) {
        const newState: ITimerState = {
            ...prevProps,
            successfull: nextState.successfull
        }
        return newState
    }

    constructor(props: ITimerProps) {
        super(props);
        this.state = {
            classes: this.props.classes,
            count: 0,
            successfull: false,
            pause: false
        }
    }

    componentDidMount() {
        this.setState({
            count: 60
        });
    }

    componentDidUpdate(prevProps: ITimerProps, prevState: ITimerState) {
        if (this.state.pause !== true) {
            if ((prevState.successfull === true) && (prevState.count !== this.state.count)) {
                // Successful match
                this.props.getTimeParams(this.state.count);
            }
            else if (prevState.successfull !== this.state.successfull) {
                // Restart timer
                this.setState({ count: 60 });
            }
            else if (prevState.count !== this.state.count || prevState.pause === true) {
                // Countdown timer only if the previous count is continuous or unpaused
                setTimeout(() => {
                    if (this.state.count > 0) { this.setState({ count: this.state.count - 1 }); }
                    else { this.props.getTimeParams(this.state.count) }
                }, 1000);
            }
        }
    }

    private pause = () => {
        this.setState({ pause: !this.state.pause });
    }

    render() {
        const { count, classes } = this.state;
        return (
            <Typography component="h1" className={classes.timerStyle} onClick={this.pause}>
                {count}
            </Typography>
        )
    }
}

export default withStyles(countStyles)(Timer);