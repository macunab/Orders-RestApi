import { Request, Response } from "express";
import transportModel from "../models/transport.model";
import { Transport } from "../interfaces/transport.interface";


class TransportController {

    async createTransport(req: Request, res: Response) {
        const transport: Transport = req.body;
        try {
            const transportQuery = new transportModel(transport);
            await transportQuery.save();
            res.status(200).json({
                ok: true,
                msg: 'The transport has been successfully create',
                data: transportQuery
            });
        } catch(error) {
            res.status(400).json({
                ok: false,
                msg: `An error ocurred while trying create a Transport, ERROR: ${ error }`
            });
        }
    }

    async updateTransport(req: Request, res: Response) {
        const { id } = req.params;
        const transport = req.body;
        try {
            await transportModel.findByIdAndUpdate(id, transport);
            res.status(200).json({
                ok: true,
                msg: 'The transport has been successfully updated',
                data: transport
            });
        } catch(error) {
            res.status(400).json({
                ok: false,
                msg: `An error ocurred while trying update a transport, ERROR: ${ error }`
            });
        }
    }

    deleteTransport = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            await transportModel.deleteOne({ _id : id });
            res.status(200).json({
                ok: true,
                msg: 'The transport has been successfully removed'
            });
        } catch(error) {
            res.status(400).json({
                ok: false,
                msg: `An error ocurred while trying delete a transport, ERROR: ${ error }`
            });
        }
    }

    async findAllTransports(req: Request, res: Response) {

        try {
            const transports = await transportModel.find();
            res.status(200).json({
                ok: true,
                msg: 'All documents found successfully',
                data: transports
            });
        } catch(error) {
            res.status(400).json({
                ok: false,
                msg: `An error ocurred while trying get all the transports from the db, ERROR: ${error}`
            });
        }
    }
}

export default new TransportController();