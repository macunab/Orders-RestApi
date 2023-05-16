import { Request, Response } from "express";
import { Customer } from "../interfaces/customer.interface";
import customerModel from "../models/customer.model";


class CustomerController {

    async createCustomer(req: Request, res: Response) {
        const customer: Customer = req.body;
        try {
            const customerQuery = new customerModel(customer);
            await customerQuery.save();
            res.status(200).json({
                ok: true,
                msg: 'The customer was create successfully'
            });
        } catch(error) {
            res.status(400).json({
                ok: false,
                msg: `An error ocurred while trying create a customer, ERROR: ${error}`
            });
        }
    }

    async findAllCustomers(req: Request, res: Response) {

        try {
            const customers = await customerModel.find();
            res.status(200).json({
                ok: true,
                msg: 'All documents found successfully',
                data: customers
            });
        } catch(error) {
            res.status(400).json({
                ok: false,
                msg: `An error ocurred while trying find all documents, ERROR: ${ error }`
            });
        }
    }

    deleteCustomer(req: Request, res: Response) {

    }

    updateCustomer(req: Request, res: Response) {

    }
}

export default new CustomerController();