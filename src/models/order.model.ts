import { Document, Schema, model } from "mongoose";
import { Order } from "../interfaces/order.interface";


const orderSchema = new Schema({
    
});

const orderModel = model<Order & Document>('Order', orderSchema);
export default orderModel;