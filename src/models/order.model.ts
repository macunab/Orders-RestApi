import { Document, Schema, model } from "mongoose";
import { Order } from "../interfaces/order.interface";


const orderSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer'
    },
    factory: {
        type: Schema.Types.ObjectId,
        ref: 'Factory'
    },
    priceList: {
        type: Schema.Types.ObjectId,
        ref: 'PriceList'
    },
    transport: {
        type: Schema.Types.ObjectId,
        ref: 'Transport'
    },
    billedPercentage: { type: Number, require: true },
    discounts: [{ type: Number }],
    finalDiscount: { type: Number, default: 0 },
    netTotal: { type: Number, require: true },
    billedAmount: { type: Number, require: true },
    remitAmount: { type: Number, require: true },
    iva: { type: Number, require: true },
    discountAmount: { type: Number, require: true },
    total: { type: Number, require: true },
    status: { type: String, default: 'Pending' },
    items: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
        price: { type: Number, require: true },
        quantity: { type: Number, require: true },
        bonus: { type: Number },
        subtotal: { type: Number, require: true }
    }]
    
}, { timestamps: true });

const orderModel = model<Order & Document>('Order', orderSchema);
export default orderModel;