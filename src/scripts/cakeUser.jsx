import React from 'react';
import batterDispatcher from './batterDispatcher';

export default class CakeUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            build: this.buildBatter(props.build)
        }
    }

    buildBatter(batter) {
        Object.keys(batter).forEach((prop) => {
            this[prop] = batter[prop];
        });
        this.currentBuild = JSON.stringify(batter);
    }

    componentWillMount() {
        let cake = this;
        batterDispatcher.register(function(data) {
            if (data.actionType === 'sent') {
                cake.setState({
                    build: cake.buildBatter(data.payload.brief)
                });
            }
        });
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <svg viewBox="0 0 450 600">

                <use xlinkHref="#svg_cake" className={ 'svg__color--' + this.flavour }></use>

                <use xlinkHref={ '#svg_holder_' + this.holder_type } className={ 'svg__color--' + this.holder_colour }></use>

                { this.hasWafer && (
                    <use xlinkHref="#svg_wafers"></use>
                )}

                <use xlinkHref={ '#svg_muffin_top_' + this.icing_type } className={ 'svg__color--' + this.icing_colour }></use>

                <use xlinkHref={ '#svg_' + this.type + '_' + this.sprinkles_type } className={ 'svg__color--' + this.sprinkles_colour }></use>

                { this.hasCream && (
                    <use xlinkHref="#svg_icing_background"></use>
                )}

                <use xlinkHref={ '#svg_' + this.type + '_' + this.topping } className={ 'svg__color--' + this.icing_colour }></use>

                { this.hasCream && (
                    <use xlinkHref="#svg_icing_foreground" className={ 'svg__color--' + this.icing_colour }></use>
                )}

            </svg>
        )
    }
}