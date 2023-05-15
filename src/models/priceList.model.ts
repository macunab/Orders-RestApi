import { Document, Schema, model } from "mongoose";
import { PriceList } from "../interfaces/priceList.interface";


const priceListSchema = new Schema({
    name: {
        type: String,
        require: true
    }
}, { timestamps: true });

const priceListModel = model<PriceList & Document>('PriceList', priceListSchema);
export default priceListModel;