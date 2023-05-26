import { Application, NextFunction, Request, Response } from "express";
import { CommonRoutesConfig } from "../helpers/CommonRoutesConfig";
import passport from "passport";
import FactoryController from "../controllers/FactoryController";
import { check } from "express-validator";
import ValidationFields from "../middlewares/ValidationFields";


export class FactoryRoute extends CommonRoutesConfig {
    
    constructor(app: Application) {
        super(app, 'FactoryRoute');
    }

    configureRoutes(): Application {

        this.app.route('/factories')
            .all((req: Request, res: Response, next: NextFunction) => {
                next();
            })
            .get(
                passport.authenticate( 'jwt', { session: false }),
                FactoryController.findAllFactories
            )
            .post(
                passport.authenticate('jwt', { session: false }),
                check('name', 'The name is required').not().isEmpty(),
                check('contact', 'The contact is required').not().isEmpty(),
                ValidationFields.verifyErrors,
                FactoryController.createFactory
            );

            this.app.route('/factories/:id')
                .all((req:Request, res: Response, next: NextFunction) => {
                    next();
                })
                .put(
                    passport.authenticate('jwt', { session: false }),
                    check('id', 'The ID param is required').not().isEmpty(),
                    check('name', 'The name is required').not().isEmpty(),
                    check('contact', 'The contact is required').not().isEmpty(),
                    ValidationFields.verifyErrors,
                    FactoryController.updateFactory
                )
                .delete(
                    passport.authenticate('jwt', { session: false }),
                    check('id', 'The ID param is required').not().isEmpty(),
                    ValidationFields.verifyErrors,
                    FactoryController.deleteFactory
                );

        return this.app;
    }

}