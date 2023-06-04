import { Types } from "mongoose";

export interface Order {
    _id: string;
    customer: Types.ObjectId;
    factory: Types.ObjectId;
    priceList: Types.ObjectId;
    transport: Types.ObjectId;
    billedPercentage: number;
    discounts: Array<number>;
    finalDiscount: number;
    items: Array<itemsCart>;
    netTotal: number;
    billedAmount: number;
    remitAmount: number;
    iva: number;
    discountAmount: number; // billedAmount + remitAmount
    total: number; // (billedAmount + remitAmoun + iva) - discountAmount;
    status: string;

}

export interface itemsCart {
    product: Types.ObjectId;
    price: number;
    quantity: number;
    bonus: number;
    subtotal: number;
}

export interface invoice {

}

export interface pay {

}