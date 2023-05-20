import { Application, NextFunction, Request, Response } from "express";
import { CommonRoutesConfig } from "../helpers/CommonRoutesConfig";
import passport from "passport";
import CustomerController from "../controllers/CustomerController";
import { check } from "express-validator";
import ValidationFields from "../middlewares/ValidationFields";


export class CustomerRoute extends CommonRoutesConfig {

    constructor(app: Application) {
        super(app, 'CustomerRoute');
    }
    
    configureRoutes(): Application {

        this.app.route('/customers')
            .all((req: Request, res: Response, next: NextFunction) => {
                next();
            })
            .get(
                passport.authenticate('jwt', { session: false }),
                CustomerController.findAllCustomers
            )
            .post(
                passport.authenticate('jwt', { session: false }),
                check('name', 'The name is required').not().isEmpty(),
                check('address', 'The address is required').not().isEmpty(),
                check('contact', 'The contact is required').not().isEmpty(),
                check('cuit', 'The CUIT is required').not().isEmpty(),
                check('ivaCondition', 'The IVA condition is required').not().isEmpty(),
                ValidationFields.verifyErrors,
                CustomerController.createCustomer
            );

        this.app.route('/customers/:id')
            .all((req: Request, res: Response, next: NextFunction) => {
                next();
            })
            .put(
                passport.authenticate('jwt', { session: false }),
                check('id', 'The customer ID is required').not().isEmpty(),
                check('name', 'The name is required').not().isEmpty(),
                check('address', 'The address is required').not().isEmpty(),
                check('contact', 'The contact is required').not().isEmpty(),
                check('cuit', 'The CUIT is required').not().isEmpty(),
                check('ivaCondition', 'The IVA condition is required').not().isEmpty(),
                ValidationFields.verifyErrors,
                CustomerController.updateCustomer
            )
            .delete(
                passport.authenticate('jwt', { session: false }),
                check('id', 'The customer ID is required').not().isEmpty(),
                CustomerController.deleteCustomer
            )

        return this.app;
    }

}