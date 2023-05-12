import { Types } from "mongoose";

/** 
 * PROBAR DIFERENCIA ENTRE USAR TYPES Y USAR UNA INTERFACE COMO POR EJEMPLO EN ESTE
 * CASO PONER FACTORY DE TIPO FACTORY... PARA VER SI ME TRAE TODO EL OBJETO CUANDO 
 * CONSULTO UN PRODUCT O SOLO ME MANDA EL ID DE FACTORY.
 */
export interface Product {
    _id: string;
    name: string;
    description: string;
    unitBox: number;
    factory: Types.ObjectId;
    prices: Array<PricePerList>;
}

export interface PricePerList {
    priceList: Types.ObjectId;
    price: number;
}