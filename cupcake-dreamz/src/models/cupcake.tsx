import { Flavour, HolderColour, HolderType, IcingColour, IcingType, SprinklesColour, SprinklesType, Topping } from './cupcakeElements';

export interface ICupcakeModel {
    flavour: string,
    holder: ICupcakeDescriptorModel,
    icing: ICupcakeDescriptorModel,
    sprinkles: ICupcakeDescriptorModel,
    topping: string,
    optional: boolean
}

export interface ICupcakeDescriptorModel {
    type: string,
    colour: string
}

export class CupcakeModel implements ICupcakeModel {
    constructor(obj?: any) {
        this.flavour = obj && obj.flavour ? obj.flavour : Flavour[Math.floor(Math.random() * Flavour.length)];
        this.holder = obj && obj.holder ? obj.holder : {
            type: HolderType[Math.floor(Math.random() * HolderType.length)],
            colour: HolderColour[Math.floor(Math.random() * HolderColour.length)]
        };
        this.icing = obj && obj.icing ? obj.icing : {
            type: IcingType[Math.floor(Math.random() * IcingType.length)],
            colour: IcingColour[Math.floor(Math.random() * IcingColour.length)]
        };
        this.sprinkles = obj && obj.sprinkles ? obj.sprinkles : {
            type: SprinklesType[Math.floor(Math.random() * SprinklesType.length)],
            colour: SprinklesColour[Math.floor(Math.random() * SprinklesColour.length)]
        };
        this.topping = obj && obj.topping ? obj.topping : Topping[Math.floor(Math.random() * Topping.length)];
        this.optional = obj && obj.optional ? obj.optional : false;
    }
    public flavour: string;
    public holder: ICupcakeDescriptorModel;
    public icing: ICupcakeDescriptorModel;
    public sprinkles: ICupcakeDescriptorModel;
    public topping: string;
    public optional: boolean;
}