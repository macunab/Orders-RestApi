import { Application, NextFunction, Request, Response } from "express";
import { CommonRoutesConfig } from "../helpers/CommonRoutesConfig";
import passport from "passport";
import OrderController from "../controllers/OrderController";
import { check } from "express-validator";
import ValidationFields from "../middlewares/ValidationFields";


export class OrderRoute extends CommonRoutesConfig {
    
    constructor(app: Application) {
        super(app, 'OrderRoutes');
    }

    configureRoutes(): Application {
        
        this.app.route('/orders')
            .all((req: Request, res: Response, next: NextFunction) => {
                next();
            })
            .get(
                passport.authenticate('jwt', { session: false }),
                OrderController.findOrders
            )
            .post(
                passport.authenticate('jwt', { session: false }),
                check('customer', 'The customer is required').not().isEmpty(),
                check('factory', 'The factory is required').not().isEmpty(),
                check('priceList', 'The price list is required').not().isEmpty(),
                check('transport', 'The transport is required').not().isEmpty(),
                check('billedPercentage', 'The billed percentage is required').not().isEmpty(),
                check('finalDiscount', 'The finalDiscount is required').not().isEmpty(),
                check('items', 'The cart items are required').not().isEmpty(),
                check('netTotal', 'The net total is required').not().isEmpty(),
                check('billedAmount', 'The billed amount is required').not().isEmpty(),
                check('remitAmount', 'The remit amount is required').not().isEmpty(),
                check('iva', 'The iva is required').not().isEmpty(),
                check('discountAmount', 'The discount amount is required').not().isEmpty(),
                check('total', 'The total is required').not().isEmpty(),
                ValidationFields.verifyErrors,
                OrderController.createOrder
            );

        return this.app;
    }

}