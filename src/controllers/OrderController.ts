import { Request, Response } from "express";
import { Order } from "../interfaces/order.interface";
import orderModel from "../models/order.model";


class OrderController {

    createOrder = async (req: Request, res: Response) => {
        const order: Order = req.body;
        try {
            const orderQuery = new orderModel(order);
            await orderQuery.save();
            res.status(200).json({
                ok: true,
                msg: 'The order has been successfully created',
                data: orderQuery
            });
        } catch(error) {
            res.status(400).json({
                ok: false,
                msg: `An error ocurred while trying create a Order, ERROR: ${error}`
            });
        }
    }

    findOrders = async (req: Request, res: Response) => {
        try {
            const orders = await orderModel.find();
            res.status(200).json({
                ok: true,
                msg: 'All documents found successfully',
                data: orders
            });
        } catch(error) {
            res.status(500).json({
                ok: false,
                msg: `An error ocurred while trying find all orders, ERROR: ${ error }`
            });
        }
    }

    updateOrder = async (req: Request, res: Response) => {
        const { id } = req.params;
        const order = req.body;
        try {
            await orderModel.findByIdAndUpdate(id, order);
            res.status(200).json({
                ok: true,
                msg: 'The order has been successfully updated'
            });
        } catch(error) {
            res.status(500).json({
                ok: false,
                msg: `An error ocurred while trying update a order, ERROR: ${error}`
            });
        }
    }

    deleteOrder = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            await orderModel.deleteOne({_id: id});
            res.status(200).json({
                ok: true,
                msg: 'The order has been successfully deleted'
            });
        } catch(error) {
            res.status(500).json({
                ok: false,
                msg: `An error ocurred while trying delete a order, ERROR: ${error}`
            });
        }
    }

    findOrdersByStatus = async (req: Request, res: Response) => {
        const { status } = req.params;
        try {
            const orders = await orderModel.find({ status });
            res.status(200).json({
                ok: true,
                msg: 'All Orders found successfuly',
                data: orders
            });
        } catch(error) {
            res.status(500).json({
                ok: false,
                msg: `An error ocurred while trying find all orders by status, ERROR: ${error}`
            });
        }
    }

}

export default new OrderController();