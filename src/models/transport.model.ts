import { Document, Schema, model } from "mongoose";
import { Transport } from "../interfaces/transport.interface";

const transportSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    address: { type: String },
    contact: { type: String }
}, { timestamps: true });

const transportModel = model<Transport, Document>('Transport', transportSchema);
export default transportModel;