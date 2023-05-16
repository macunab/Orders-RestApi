import { Document, Schema, model } from "mongoose";
import { Product } from "../interfaces/product.interface";

const productSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String
    },
    unitBox: {
        type: Number
    },
    factory: {
        type: Schema.Types.ObjectId,
        ref: 'Factory'
    },
    prices: [{
        priceList: {
            type: Schema.Types.ObjectId,
            ref: 'PriceList'
        },
        price: {
            type: Number,
            require: true
        }
    }]
});

const productModel = model<Product & Document>('Product', productSchema);
export default productModel;