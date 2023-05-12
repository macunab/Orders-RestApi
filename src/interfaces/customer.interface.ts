import { Types } from "mongoose";

export interface Customer {
    _id: string;
    name: string;
    address: string;
    contact: string;
    cuit: string;
    ivaCondition: string;
    factoryDiscounts: Array<FactoryDiscount>;
}

export interface FactoryDiscount {
    factory: Types.ObjectId;
    transport: Types.ObjectId;
    individualDiscounts: Array<number>;
    finalDiscount: number;
}