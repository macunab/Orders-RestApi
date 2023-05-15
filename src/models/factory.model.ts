import { Document, Schema, model } from "mongoose";
import { Factory } from "../interfaces/factory.interface";


const factorySchema = new Schema({
    name: {
        type: String,
        require: true
    },
    address: {
        type: String
    },
    contact: {
        type: String,
        required: true
    }
}, { timestamps: true });

const factoryModel = model<Factory & Document>('Factory', factorySchema);
export default factoryModel;