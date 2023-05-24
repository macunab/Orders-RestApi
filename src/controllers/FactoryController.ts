import { Request, Response } from "express";
import factoryModel from "../models/factory.model";
import { Factory } from "../interfaces/factory.interface";


class FactoryController {

    // add data in the successfully res?
    async createFactory(req: Request, res: Response) {
        const factory: Factory = req.body;
        try {
            const factoryQuery = new factoryModel(factory);
            await factoryQuery.save();
            res.status(200).json({
                ok: true,
                msg: 'The factory was created successfully'
            });
        } catch(error) {
            res.status(400).json({
                ok: false,
                msg: `An error ocurred while trying create a factory, ERROR: ${ error }`
            });
        }
    }

    async findAllFactories(req: Request, res: Response) {

        try {
            const factories = await factoryModel.find();
            res.status(200).json({
                ok: true,
                msg: 'All documents were successfully found',
                data: factories
            });
        } catch(error) {
            res.status(400).json({
                ok: false,
                msg: `An error ocurred while trying find all factories`
            })
        }
    }

    async updateFactory(req: Request, res: Response) {
        const { id } = req.params;
        const factory = req.body;
        try {
            await factoryModel.findByIdAndUpdate(id, factory);
            res.status(200).json({
                ok: true,
                msg: 'The factory has been successfully updated'
            });
        } catch(error) {
            res.status(200).json({
                ok: false,
                msg: `An error ocurred while trying update a factory, ERROR: ${ error }`
            });
        }
    }

    async deleteFactory(req: Request, res: Response) {
        const { id } = req.params;
        try {
            await factoryModel.deleteOne({ _id: id });
            res.status(200).json({
                ok: false,
                msg: 'The factory has been successfully deleted'
            })
        } catch(error) {
            res.status(400).json({
                ok: false,
                msg: `An error ocurred while trying to delete a factory, ERROR: ${error}`
            });
        }
    }

}

export default new FactoryController();