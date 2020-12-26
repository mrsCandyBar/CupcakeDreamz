import React from 'react';
import { Typography, withStyles } from '@material-ui/core';
import { countStyles } from '../assets/styles/layout';

interface IConfettiProps {
    classes: any;
    toggleTimeout(): any;
    canToggle?: boolean;
}
interface IConfettiState {
    classes: any;
    canToggle?: boolean;
}

class Confetti extends React.Component<IConfettiProps, IConfettiState> {

    static getDerivedStateFromProps(nextProps:IConfettiProps, prevState:IConfettiState) {
        const updateState: IConfettiState = {
            ...prevState,
            canToggle: nextProps.canToggle
        }
        return updateState;
    }

    constructor(props: IConfettiProps) {
        super(props);
        this.state = {
            classes: this.props.classes,
            canToggle: this.props.canToggle
        }
    }

    componentDidMount() {
        if (this.props.canToggle === true) {
            setTimeout(() => {
                this.props.toggleTimeout();
            }, 5000);
        }
    }

    render() {
        const { classes } = this.state;
        const CreateConfetti = [];
        for (let i = 0; i < 200; i++) {
            CreateConfetti.push(<div key={i} className={`${classes.confetti} ${classes.confetti}_${i}`} />)
        }

        return (
            <React.Fragment>
                {CreateConfetti}
            </React.Fragment>
        )
    }
}

export default withStyles(countStyles)(Confetti);