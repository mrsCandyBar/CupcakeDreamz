import React from 'react';

interface ISVGProps {
    visible: {
        svg?: any,
        flavour?: string,
        holder?: any,
        icing?: any,
        sprinkles?: any,
        topping?: string,
        optional?: boolean
    },
    name: string
}
interface ISVGState extends ISVGProps {}

class SVG extends React.Component<ISVGProps, ISVGState> {

    static getDerivedStateFromProps(nextProps: ISVGProps, prevState: ISVGState) {
        const updateState: ISVGState = {
            ...prevState,
            ...nextProps
        } 
        return updateState;
    }

    constructor(props:ISVGProps) {
        super(props);
        this.state = {
            ...props
        }
    }

    render() {
        const RenderSVG = (svgObj:any) => {
            return (
                svgObj.visibleList.map((section:string, index:number) => (
                    <use
                        key={index}
                        href={`#${this.props.name}_${section}`}
                        x="0"
                        y="0"
                        width="100%"
                        height="100%"
                    />
                )
                ))
        }

        const {
            svg,
            flavour,
            holder,
            icing,
            sprinkles,
            topping,
            optional
        } = this.props.visible;

        return (
            <svg width={svg ? svg.width : '100%'} height={svg ? svg.height : '100%'} viewBox={svg ? svg.viewBox : "0 0 450 600"} x="0" y="0" preserveAspectRatio={svg && svg.preserveAspectRatio ? svg.preserveAspectRatio : "xMidYMid meet"}>
                <RenderSVG visibleList={[
                    ((flavour || this.props.name === "preview") && 'cake'),
                    (holder && (holder.colour ? `svg_holder_${holder.type}_colour` : `svg_holder_${holder.type}`)),
                    (icing && optional && icing.type === 'flared' && `svg_tall_big_wafer`),
                    (icing && optional && icing.type === 'swirl' && `svg_wafers`),

                    (icing && (icing.colour ? `svg_muffin_top_${icing.type}_colour` : `svg_muffin_top_${icing.type}`)),


                    (sprinkles && (sprinkles.type && (
                        sprinkles.colour ? 
                            icing && icing.type === 'swirl' ? `svg_tall_${sprinkles.type}_colour` : `svg_short_${sprinkles.type}_colour` :
                            icing && icing.type === 'swirl' ? `svg_tall_${sprinkles.type}` : `svg_short_${sprinkles.type}`)
                    )),


                    (optional && icing && icing.type !== 'swirl') && (icing.type === 'flared' ? (icing.colour ? `svg_icing_background_colour` : `svg_icing_background`) : `svg_cream_background`),

                    (topping && icing && (
                        icing.colour ? 
                            icing.type === 'swirl' ? `svg_tall_${topping}_colour` : `svg_short_${topping}` :
                            icing.type === 'swirl' ? `svg_tall_${topping}` : `svg_short_${topping}`
                        )),

                    (optional && icing && icing.type !== 'swirl') && (icing.type === 'flared' ? (icing.colour ? `svg_icing_foreground_colour` : `svg_icing_foreground`) : `svg_cream_foreground`)
                ]} />
            </svg>
        )
    }
}

export default SVG;