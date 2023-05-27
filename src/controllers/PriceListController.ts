import { Request, Response } from "express";
import { PriceList } from "../interfaces/priceList.interface";
import priceListModel from "../models/priceList.model";


class PriceListController {

    createPriceList = async (req: Request, res: Response) => {
        const priceList: PriceList = req.body;
        try {
            const priceListQuery = new priceListModel(priceList);
            await priceListQuery.save();
            res.status(200).json({
                ok: true,
                msg: 'The product has been created successfully'
            });
        } catch(error) {
            res.status(400).json({
                ok: false,
                msg: `An error ocurred while trying create a PriceList, ERROR: ${error}`
            });
        }
    }

    updatePriceList = async (req: Request, res: Response) => {
        const { id } = req.params;
        const priceList = req.body;
        try {
            await priceListModel.findByIdAndUpdate(id, priceList);
            res.status(200).json({
                ok: true,
                msg: 'The PriceList has been successfully updated'
            });
        } catch(error) {
            res.status(400).json({
                ok: false,
                msg: `An error ocurred while trying update a PriceList, ERROR: ${ error }`
            });
        }
    }

    deletePriceList = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            await priceListModel.deleteOne({ _id : id });
            res.status(200).json({
                ok: true,
                msg: 'The PriceList has been successfully removed'
            });
        } catch(error) {
            res.status(400).json({
                ok: false,
                msg: `An error ocurred while trying remove a PriceList from the DB, ERROR: ${ error }`
            });
        }
    }

    findAllPriceLists = async (req: Request, res: Response) => {
        try {
            const priceLists = await priceListModel.find();
            res.status(200).json({
                ok: true,
                msg: 'All documents found successfully',
                data: priceLists
            });
        } catch(error) {
            res.status(400).json({
                ok: false,
                msg: `An error ocurred while trying get all PriceLists, ERROR: ${ error }`
            });
        }
    }

}

export default new PriceListController();