import { Flavour, HolderColour, HolderType, IcingColour, IcingType, SprinklesColour, SprinklesType, Topping } from './cupcakeElements';

export interface ICupcakeCreatorModel {
    flavour: Array<string>,
    holder: ICupcakeCreatorDescriptorModel,
    icing: ICupcakeCreatorDescriptorModel,
    sprinkles: ICupcakeCreatorDescriptorModel,
    topping: Array<string>,
    optional: Array<boolean>
}

export interface ICupcakeCreatorDescriptorModel {
    type: Array<string>,
    colour: Array<string>
}

export class CupcakeCreatorModel implements ICupcakeCreatorModel {
    constructor(obj?: any) {
        this.flavour = obj && obj.flavour ? obj.flavour :       [...Flavour];
        this.holder = obj && obj.holder ? obj.holder :          { type: [...HolderType], colour: [...HolderColour] };
        this.icing = obj && obj.icing ? obj.icing :             { type: [...IcingType], colour: [...IcingColour] };
        this.sprinkles = obj && obj.sprinkles ? obj.sprinkles : { type: [...SprinklesType], colour: [...SprinklesColour] };
        this.topping = obj && obj.topping ? obj.topping :       [...Topping];
        this.optional = obj && obj.optional ? obj.optional :    [true, false];
    }
    public flavour: Array<string>;
    public holder: ICupcakeCreatorDescriptorModel;
    public icing: ICupcakeCreatorDescriptorModel;
    public sprinkles: ICupcakeCreatorDescriptorModel;
    public topping: Array<string>;
    public optional: Array<boolean>;
}