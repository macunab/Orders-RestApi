import { Document, Schema, model } from "mongoose";
import { Customer } from "../interfaces/customer.interface";


const customerSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    address: { 
        type: String,
        require: true
    },
    contact: {
        type: String,
        require: true
    },
    cuit: {
        type: String,
        require: true
    },
    ivaCondition: {
        type: String,
        require: true
    },
    factoryDiscounts: [{
        factory: {
            type: Schema.Types.ObjectId,
            ref: 'Factory'
        },
        transport: {
            type: Schema.Types.ObjectId,
            ref: 'Transport'
        },
        individualDiscounts: [Number],
        finalDiscount: {
            type: Number,
            require: true
        }
    }]
}, { timestamps: true });

const customerModel = model<Customer & Document>('Customer', customerSchema);
export default customerModel;