import React from 'react';
import Svg from './svg';
import { Grid, withStyles } from '@material-ui/core';
import { pageStyles } from '../assets/styles/layout';

interface IPreviewProps {
    classes: any,
    img: any,
    updateClass: boolean
}
interface IPreviewState {
    animateClass: boolean,
    updateClass: boolean
}
class Preview extends React.Component<IPreviewProps, IPreviewState> {

    static getDerivedStateFromProps(nextState: IPreviewProps, prevProps: IPreviewState) {
        const newState: IPreviewState = {
            ...prevProps,
            updateClass: nextState.updateClass
        }
        return newState
    }

    constructor(props: IPreviewProps) {
        super(props);
        this.state = {
            animateClass: false,
            updateClass: this.props.updateClass
        }
    }

    componentDidUpdate(prevProps: IPreviewProps, prevState: IPreviewState) {
        if (this.state.updateClass != prevState.updateClass) {
            this.setState({ animateClass: true });
            setTimeout(() => {
                this.setState({ animateClass: false });
            }, 2500);
        }
    }

    render() {
        const { img, classes } = this.props;
        const { animateClass, updateClass } = this.state;

        const classList = `
            ${classes.imgSmall} 
            ${updateClass ? 'invisible' : 'visible'}
            ${animateClass ? (updateClass ? 'animateUp' : 'animateDown') : ''}
        `;

        return (
            <Grid item xs={12} className={`${classes.holdPosition} ${updateClass ? 'withoutActions' : 'withActions'}`}>
                <Grid container alignItems="center" alignContent="center" justify="center">
                    <Grid item xs={12} className={classList}>
                        <Svg visible={img} name="match" />
                        {this.props.children}
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(pageStyles)(Preview);