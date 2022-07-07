import React from 'react';
import dispatcher from '../helpers/dispatcher.js';

export default class Cake extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            build: props.build
        }
    }

    componentWillMount() {
        this.listenToEvents(this);
    }

    listenToEvents(component) {
        let $this = component;

        dispatcher.register(function(data) {
            if (data.actionType === 'update') {
                $this.updateComponent(data.payload);
            }
        });
    }

    updateComponent(data) {
        this.setState({
            build: data
        });
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <svg viewBox="0 0 450 600">

                <use xlinkHref="#svg_cake" className={ 'svg__color--' + this.state.build.flavour }></use>

                <use xlinkHref={ '#svg_holder_' + this.state.build.holder_type } className={ 'svg__color--' + this.state.build.holder_colour }></use>

                { this.state.build.hasWafer && (
                    <use xlinkHref="#svg_wafers"></use>
                )}

                <use xlinkHref={ '#svg_muffin_top_' + this.state.build.icing_type } className={ 'svg__color--' + this.state.build.icing_colour }></use>

                <use xlinkHref={ '#svg_' + this.state.build.type + '_' + this.state.build.sprinkles_type } className={ 'svg__color--' + this.state.build.sprinkles_colour }></use>

                { this.state.build.hasCream && (
                    <use xlinkHref="#svg_icing_background"></use>
                )}

                <use xlinkHref={ '#svg_' + this.state.build.type + '_' + this.state.build.topping } className={ 'svg__color--' + this.state.build.icing_colour }></use>

                { this.state.build.hasCream && (
                    <use xlinkHref="#svg_icing_foreground" className={ 'svg__color--' + this.state.build.icing_colour }></use>
                )}

            </svg>
        )
    }
}