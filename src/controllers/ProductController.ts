import { Request, Response } from "express";
import productModel from "../models/product.model";


class ProductController {

    createProduct = async (req: Request, res: Response) => {
        const product = req.body;
        try {
            const productQuery = new productModel(product);
            await productQuery.save();
            res.status(200).json({
                ok: true,
                msg: `The Product has been successfully create`,
                data: productQuery
            });
        } catch(error) {
            res.status(400).json({
                ok: false,
                msg: `An error ocurred while trying create a Product, ERROR: ${ error }`
            });
        }
    }

    updateProduct = async (req: Request, res: Response) => {
        const { id } = req.params;
        const product = req.body;
        try {
            await productModel.findByIdAndUpdate(id, product);
            res.status(200).json({
                ok: true,
                msg: 'The Product has been successfully updated'
            });
        } catch(error) {
            res.status(400).json({
                ok: false,
                msg: `An error ocurred while trying update a Product, ERROR: ${ error }`
            });
        }
    }

    deleteProduct = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            await productModel.deleteOne({ _id : id });
            res.status(200).json({
                ok: true,
                msg: 'The Product has been successfully remove'
            });
        } catch(error) {
            res.status(400).json({
                ok: false,
                msg: `An error ocurred while trying remove a Product, ERROR: ${ error }`
            });
        }
    }

    // factoryId from header? params? body?
    findProductsByFactory = async (req: Request, res: Response) => {
        const factory = req.body;
        try {
            const products = await productModel.find({ factory: factory });
            res.status(200).json({
                ok: true,
                msg: 'All documents found successfully',
                data: products
            });
        } catch(error) {
            res.status(400).json({
                ok: false,
                msg: `An error ocurred while trying get all Products by factory, ERROR: ${ error }`
            });
        }
    }

    findAllProducts = async (req: Request, res: Response) => {
        try {
            const products = await productModel.find();
            res.status(200).json({
                ok: true,
                msg: 'All documents found successfully',
                data: products
            });
        } catch(error) {
            res.status(400).json({
                ok: false,
                msg: `An error ocurred while trying get all Products, ERROR: ${ error }`
            });
        }
    }

}

export default new ProductController();