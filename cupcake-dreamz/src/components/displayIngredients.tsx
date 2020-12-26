import React from 'react';
import Svg from './svg';
import { Grid, withStyles } from '@material-ui/core';
import { pageStyles } from '../assets/styles/layout';

interface IDisplayIngredientsProps {
    classes: any,
    ingredients: any,
    updateClass: boolean
}
interface IDisplayIngredientsState {
    animateClass: boolean,
    updateClass: boolean,
    hasAction: boolean
}
class DisplayIngredients extends React.Component<IDisplayIngredientsProps, IDisplayIngredientsState> {

    static getDerivedStateFromProps(nextState: IDisplayIngredientsProps, prevProps: IDisplayIngredientsState) {
        const newState: IDisplayIngredientsState = {
            ...prevProps,
            updateClass: nextState.updateClass,
            hasAction: Boolean(nextState.ingredients[0].action)
        }
        return newState
    }

    constructor(props: IDisplayIngredientsProps) {
        super(props);
        this.state = {
            animateClass: false,
            updateClass: this.props.updateClass,
            hasAction: Boolean(this.props.ingredients[0].action)
        }
    }

    componentDidUpdate(prevProps: IDisplayIngredientsProps, prevState: IDisplayIngredientsState) {
        if (this.state.updateClass !== prevState.updateClass && !this.state.hasAction) {
            this.setState({ animateClass: true });
            setTimeout(() => {
                this.setState({ animateClass: false });
            }, 2500);
        }
    }

    render() {
        const { ingredients, classes } = this.props;
        const { animateClass, hasAction } = this.state;

        const classList = (singleImg: boolean) => `
            ${classes.imgSmall} 
            ${singleImg ? '' : classes.halfSvg} 
            ${hasAction ? 'visible' : 'invisible'}
            ${animateClass ? (hasAction ? 'animateIn' : 'animateOut') : ''}
        `;

        const GetImageAndHolder = (props:any) => {
            return hasAction ? (
                <Grid item xs={props.single ? 12 : 6} className={classList(props.single)} onClick={props.img.action}>
                    <Svg visible={props.img.visible} name="cupcake" />
                </Grid>
            ) : (
                <Grid item xs={props.single ? 12 : 6} className={classList(props.single)}>
                    <Svg visible={props.img.visible} name="cupcake" />
                </Grid>
            );
        }

        return (
            <Grid item xs={2} className={`${classes.holdPosition} ${hasAction ? 'withActions' : 'withoutActions'}`}>
                <Grid container>
                    {ingredients.length > 1 ? (
                        <React.Fragment>
                            <GetImageAndHolder img={ingredients[0]} />
                            <GetImageAndHolder img={ingredients[1]} />
                        </React.Fragment>
                    ) : (
                            <GetImageAndHolder img={ingredients[0]} single={true} />
                        )}
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(pageStyles)(DisplayIngredients);