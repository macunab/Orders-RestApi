import { Application, NextFunction, Request, Response } from "express";
import { CommonRoutesConfig } from "../helpers/CommonRoutesConfig";
import passport from "passport";
import PriceListController from "../controllers/PriceListController";
import { check } from "express-validator";
import ValidationFields from "../middlewares/ValidationFields";


export class PriceListRoute extends CommonRoutesConfig {
    
    constructor(app: Application) {
        super(app, 'PriceListRoute');
    }

    configureRoutes(): Application {

        this.app.route('/priceLists')
            .all((req: Request, res: Response, next: NextFunction) => {
                next();
            })
            .get(
                passport.authenticate('jwt', { session: false }),
                PriceListController.findAllPriceLists
            )
            .post(
                passport.authenticate('jwt', { session: false }),
                check('name', 'The name is required').not().isEmpty(),
                ValidationFields.verifyErrors,
                PriceListController.createPriceList
            );

        this.app.route('/priceLists/:id')
            .all((req: Request, res: Response, next: NextFunction) => {
                next();
            })
            .put(
                passport.authenticate('jwt', { session: false }),
                check('id', 'The param ID is required').not().isEmpty(),
                check('name', 'The name is required').not().isEmpty(),
                ValidationFields.verifyErrors,
                PriceListController.updatePriceList
            )
            .delete(
                passport.authenticate('jwt', { session: false }),
                check('id', 'The param ID is required').not().isEmpty(),
                ValidationFields.verifyErrors,
                PriceListController.deletePriceList
            );

        return this.app;
    }

}