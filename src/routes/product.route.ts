import { Application, NextFunction, Request, Response } from "express";
import { CommonRoutesConfig } from "../helpers/CommonRoutesConfig";
import passport from "passport";
import ProductController from "../controllers/ProductController";
import { check } from "express-validator";
import ValidationFields from "../middlewares/ValidationFields";

export class ProductRoute extends CommonRoutesConfig {
    
    constructor(app: Application) {
        super(app, 'ProductRoutes');
    }
    configureRoutes(): Application {
       
        this.app.route('/products')
            .all((req: Request, res: Response, next: NextFunction) => {
                next();
            })
            .get(
                passport.authenticate('jwt', { session: false }),
                ProductController.findAllProducts
            )
            .post(
                passport.authenticate('jwt', { session: false }),
                check('name', 'The name is required').not().isEmpty(),
                check('factory', 'The factory is required').not().isEmpty(),
                ValidationFields.verifyErrors,
                ProductController.createProduct
            );

        this.app.route('/products/:id')
            .all((req: Request, res: Response, next: NextFunction) => {
                next();
            })
            .put(
                passport.authenticate('jwt', { session: false }),
                check('id', 'The param ID is required').not().isEmpty(),
                check('name', 'The name is required').not().isEmpty(),
                check('factory', 'The factory is required').not().isEmpty(),
                ValidationFields.verifyErrors,
                ProductController.updateProduct
            )
            .delete(
                passport.authenticate('jwt', { session: false }),
                check('id', 'The param ID is required').not().isEmpty(),
                ValidationFields.verifyErrors,
                ProductController.deleteProduct
            );

        this.app.route('/products/factory/:id')
                .get(
                    passport.authenticate('jwt', { session: false }),
                    check('id', 'The param factory ID is required'),
                    ValidationFields.verifyErrors,
                    ProductController.findProductsByFactory
                )
        return this.app;
    }

}