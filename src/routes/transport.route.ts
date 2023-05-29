import { Application, NextFunction, Request, Response } from "express";
import { CommonRoutesConfig } from "../helpers/CommonRoutesConfig";
import passport from "passport";
import TransportController from "../controllers/TransportController";
import { check } from "express-validator";
import ValidationFields from "../middlewares/ValidationFields";


export class TransportRoute extends CommonRoutesConfig {

    constructor(app: Application) {
        super(app, 'TransportRoutes');
    }
    configureRoutes(): Application {

        this.app.route('/transports')
            .all((req: Request, res: Response, next: NextFunction) => {
                next();
            })
            .get(
                passport.authenticate('jwt', { session: false }),
                TransportController.findAllTransports
            )
            .post(
                passport.authenticate('jwt', { session: false }),
                check('name', 'The name is required').not().isEmpty(),
                ValidationFields.verifyErrors,
                TransportController.createTransport
            );

        this.app.route('/transports/:id')
            .all((req: Request, res: Response, next: NextFunction) => {
                next();
            })
            .put(
                passport.authenticate('jwt', { session: false }),
                check('id', 'The param ID is required').not().isEmpty(),
                check('name', 'The name is required').not().isEmpty(),
                ValidationFields.verifyErrors,
                TransportController.updateTransport
            )
            .delete(
                passport.authenticate('jwt', { session: false }),
                check('id', 'The param ID is required').not().isEmpty(),
                ValidationFields.verifyErrors,
                TransportController.deleteTransport
            );
        return this.app;
    }

}